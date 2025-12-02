//수면 최적화

const { db } = require('../config/firebase');
const bloodCaffeineService = require('./bloodCaffeineService');

/**
 * 지난 24시간 섭취 이력 조회
 */
async function getCaffeineLogsLast24Hours(userId, sleepTime) {
  try {
    const oneDayAgo = new Date(sleepTime.getTime() - 24 * 60 * 60 * 1000);

    const snapshot = await db
      .collection('bloodCaffeine')  // ← 변경: drink_logs 대신 bloodCaffeine
      .where('userId', '==', userId)
      .where('timestamp', '>=', oneDayAgo)
      .where('timestamp', '<=', sleepTime)
      .orderBy('timestamp', 'asc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp)
    }));
  } catch (error) {
    console.error('getCaffeineLogsLast24Hours Error:', error);
    throw error;
  }
}

/**
 * 사용자 정보 조회
 */
async function getUserInfo(userId) {
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    return userDoc.exists ? userDoc.data() : {};
  } catch (err) {
    console.error('Error fetching user info:', err);
    return {};
  }
}

/**
 * 수면 시간의 BCC 계산 (bloodCaffeineService 활용)
 */
function calculateBCC({ caffeineMg, intakeTime, sleepTime, userInfo }) {
  const deltaH = (sleepTime - intakeTime) / 36e5; // ms → 시간
  
  if (deltaH < 0) return 0;

  try {
    const result = bloodCaffeineService.calculateBloodLevels(
      {
        intakeTime: new Date(intakeTime),
        caffeineMg: caffeineMg,
        smoking: userInfo.smoking || false,
        pregnant: userInfo.pregnant || false,
        age: userInfo.age || 30,
        liverDisease: userInfo.liverDisease || false,
        weightKg: userInfo.weightKg || 70
      },
      true // 보정계수 제외
    );
    
    return result.concentrationMgPerL;
  } catch (err) {
    console.error('Error in BCC calculation:', err);
    return 0;
  }
}

/**
 * 영향 레벨 판정
 */
function determineImpactLevel(totalBCC) {
  if (totalBCC < 1) return '낮음';      // LOW
  if (totalBCC < 3) return '보통';      // MEDIUM
  return '높음';                        // HIGH
}

/**
 * 수면 영향도 BCC 계산 (메인 함수)
 */
async function calculateSleepImpactBCC(userId, sleepTime) {
  try {
    // 사용자 데이터 조회
    const [caffeineHistory, userInfo] = await Promise.all([
      getCaffeineLogsLast24Hours(userId, sleepTime),
      getUserInfo(userId)
    ]);

    let totalBCC = 0;
    const drinkDetails = [];

    // 각 섭취별 BCC 계산
    for (const log of caffeineHistory) {
      const intakeTimeMs = log.timestamp.getTime ? log.timestamp.getTime() : log.timestamp;
      const sleepTimeMs = sleepTime.getTime ? sleepTime.getTime() : sleepTime;
      
      const bcc = calculateBCC({
        caffeineMg: log.caffeineMg || 100,
        intakeTime: intakeTimeMs,
        sleepTime: sleepTimeMs,
        userInfo: userInfo
      });

      totalBCC += bcc;

      drinkDetails.push({
        intakeTime: log.timestamp,
        caffeineMg: log.caffeineMg || 100,
        bccAtSleep: Math.round(bcc * 100) / 100,
        elapsedHours: ((sleepTimeMs - intakeTimeMs) / 36e5).toFixed(2)
      });
    }

    const impactLevel = determineImpactLevel(totalBCC);

    return {
      success: true,
      userId: userId,
      sleepTime: sleepTime.toISOString(),
      predictedBCC: Math.round(totalBCC * 100) / 100,
      impactLevel: impactLevel,
      description: getLevelDescription(impactLevel),
      recommendation: getRecommendation(impactLevel),
      drinkDetails: drinkDetails,
      drinkCount: drinkDetails.length
    };
  } catch (error) {
    console.error('calculateSleepImpactBCC Error:', error);
    throw error;
  }
}

/**
 * 영향 레벨별 설명
 */
function getLevelDescription(level) {
  const descriptions = {
    '낮음': '카페인이 충분히 제거되어 수면에 미치는 영향이 적습니다.',
    '보통': '아직 어느 정도의 카페인이 남아있어 수면에 약간의 영향을 미칠 수 있습니다.',
    '높음': '카페인이 충분히 제거되지 않아 수면에 상당한 영향을 미칠 수 있습니다.'
  };
  return descriptions[level] || '';
}

/**
 * 영향 레벨별 권장사항
 */
function getRecommendation(level) {
  const recommendations = {
    '낮음': '좋은 수면 환경을 유지하세요.',
    '보통': '충분한 휴식을 취하고 가능하면 카페인 섭취를 줄이세요.',
    '높음': '카페인 섭취를 피하고 충분한 휴식을 취하세요.'
  };
  return recommendations[level] || '';
}

module.exports = {
  calculateSleepImpactBCC,
  getCaffeineLogsLast24Hours,
  calculateBCC,
  determineImpactLevel,
  getUserInfo,
  getLevelDescription,
  getRecommendation
};
