// src/services/bccChartService.js

const { db } = require('../config/firebase');
const bloodCaffeineService = require('./bloodCaffeineService');

/**
 * BCC Chart 시각화 서비스
 * 시간 범위별 카페인 농도 차트 데이터 생성
 */

class BCCChartService {
  /**
   * 사용자의 카페인 섭취 기록 조회
   * @param {string} userId - 사용자 ID
   * @returns {Promise<Array>} 섭취 기록 배열
   */
  async getUserIntakeHistory(userId) {
    try {
      const snapshot = await db
        .collection('intakes')
        .where('userId', '==', userId)
        .orderBy('timestamp', 'desc')
        .limit(100)
        .get();

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp)
      }));
    } catch (err) {
      console.error('Error fetching intake history:', err);
      return [];
    }
  }

  /**
   * 사용자 정보 조회 (보정계수 적용용)
   * @param {string} userId - 사용자 ID
   * @returns {Promise<Object>} 사용자 정보
   */
  async getUserInfo(userId) {
    try {
      const userDoc = await db.collection('users').doc(userId).get();
      if (userDoc.exists) {
        return userDoc.data();
      }
      return {};
    } catch (err) {
      console.error('Error fetching user info:', err);
      return {};
    }
  }

  /**
   * 특정 시간의 총 카페인 농도 계산
   * @param {Array} intakeHistory - 섭취 기록
   * @param {Date} checkTime - 확인 시간
   * @param {Object} userInfo - 사용자 정보
   * @returns {number} 총 카페인 농도 (mg/L)
   */
  calculateBCCAtTime(intakeHistory, checkTime, userInfo = {}) {
    let totalBCC = 0;

    intakeHistory.forEach(intake => {
      const intakeTime = new Date(intake.timestamp);

      // 섭취 시간이 확인 시간보다 이전인 경우만 계산
      if (intakeTime <= checkTime) {
        try {
          const result = bloodCaffeineService.calculateBloodLevels(
            {
              intakeTime: intakeTime,
              caffeineMg: intake.caffeineMg || 100,
              smoking: userInfo.smoking || false,
              pregnant: userInfo.pregnant || false,
              age: userInfo.age || 30,
              liverDisease: userInfo.liverDisease || false,
              weightKg: userInfo.weightKg || 70
            },
            true // 보정계수 제외 (기본값 사용)
          );
          
          totalBCC += result.concentrationMgPerL;
        } catch (err) {
          console.error('Error calculating BCC:', err);
        }
      }
    });

    return parseFloat(totalBCC.toFixed(3));
  }

  /**
   * 시간 범위별 BCC 차트 데이터 생성
   * @param {string} userId - 사용자 ID
   * @param {Object} options - 옵션
   *   - pastHours: 과거 시간 (기본: 12)
   *   - futureHours: 미래 시간 (기본: 6)
   *   - intervalMinutes: 데이터 간격 (기본: 60분)
   * @returns {Promise<Array>} 차트 데이터
   */
  async generateBCCChart(userId, options = {}) {
    const {
      pastHours = 12,
      futureHours = 6,
      intervalMinutes = 60
    } = options;

    try {
      // 사용자 데이터 조회
      const [intakeHistory, userInfo] = await Promise.all([
        this.getUserIntakeHistory(userId),
        this.getUserInfo(userId)
      ]);

      // 시간 범위 설정
      const now = new Date();
      const startTime = new Date(now.getTime() - pastHours * 60 * 60 * 1000);
      const endTime = new Date(now.getTime() + futureHours * 60 * 60 * 1000);

      const chartData = [];
      let currentTime = new Date(startTime);

      // 지정된 간격으로 데이터 생성
      while (currentTime <= endTime) {
        const bcc = this.calculateBCCAtTime(intakeHistory, currentTime, userInfo);

        chartData.push({
          timestamp: currentTime.toISOString(),
          displayTime: currentTime.toLocaleString('ko-KR', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }),
          bcc: bcc,
          hour: currentTime.getHours(),
          minute: currentTime.getMinutes(),
          isNow: Math.abs(currentTime - now) < 60000 // 1분 오차 범위
        });

        currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
      }

      return {
        success: true,
        userId: userId,
        baseTime: now.toISOString(),
        pastHours: pastHours,
        futureHours: futureHours,
        chartData: chartData,
        maxBCC: Math.max(...chartData.map(d => d.bcc)),
        minBCC: Math.min(...chartData.map(d => d.bcc)),
        currentBCC: chartData.find(d => d.isNow)?.bcc || 0
      };
    } catch (err) {
      console.error('Error generating BCC chart:', err);
      throw err;
    }
  }

  /**
   * 개별 섭취 기록별 BCC 데이터
   * @param {string} userId - 사용자 ID
   * @returns {Promise<Object>} 섭취별 BCC 정보
   */
  async getIntakeDetails(userId) {
    try {
      const [intakeHistory, userInfo] = await Promise.all([
        this.getUserIntakeHistory(userId),
        this.getUserInfo(userId)
      ]);

      const now = new Date();

      const details = intakeHistory.map(intake => {
        const result = bloodCaffeineService.calculateBloodLevels(
          {
            intakeTime: intake.timestamp,
            caffeineMg: intake.caffeineMg || 100,
            smoking: userInfo.smoking || false,
            pregnant: userInfo.pregnant || false,
            age: userInfo.age || 30,
            liverDisease: userInfo.liverDisease || false,
            weightKg: userInfo.weightKg || 70
          },
          true
        );

        return {
          intakeId: intake.id,
          drink: intake.drink || '카페인 음료',
          caffeineMg: intake.caffeineMg || 100,
          timestamp: intake.timestamp.toISOString(),
          currentBCC: result.concentrationMgPerL,
          halfLife: result.halfLifeH,
          deltaHours: result.deltaHours,
          eliminationRate: result.eliminationRate
        };
      });

      return {
        success: true,
        userId: userId,
        baseTime: now.toISOString(),
        intakeDetails: details
      };
    } catch (err) {
      console.error('Error getting intake details:', err);
      throw err;
    }
  }
}

module.exports = new BCCChartService();
