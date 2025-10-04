// src/services/customCoffeeService.js

const { db } = require('../config/firebase');

// 원두별 카페인 함량 (mg/g)
const CAFFEINE_PER_G = {
  arabica: 12,
  robusta: 20
};

// 추출 방식별 최대 추출 효율
const EF_MAX = {
  espresso: 0.95,
  hand_drip: 0.85
};

/**
 * 커스텀 음료 카페인 계산
 */
function calculateCustomCaffeine({ brewMethod, beansG, beanType }) {
  const caffeineMgPerG = CAFFEINE_PER_G[beanType] || CAFFEINE_PER_G.arabica;
  const ef = EF_MAX[brewMethod] || EF_MAX.hand_drip;
  const caffeineMg = beansG * caffeineMgPerG * ef;
  return Number(caffeineMg.toFixed(2));
}

/**
 * Firestore에 기록 저장
 */
async function saveCustomCoffeeRecord(userId, { brewMethod, beansG, beanType, caffeineMg }) {
  const docRef = await db.collection('customCoffee').add({
    userId,
    brewMethod,
    beansG,
    beanType,
    caffeineMg,
    timestamp: new Date()
  });
  const snap = await docRef.get();
  return { id: docRef.id, ...snap.data() };
}

/**
 * 사용자별 모든 커스텀 음료 조회
 */
async function getCustomCoffees(userId) {
  const snap = await db
    .collection('customCoffee')
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .get();
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * 단일 레코드 수정 (beansG, beanType, brewMethod 변경 가능)
 */
async function updateCustomCoffee(userId, id, updates) {
  const ref = db.collection('customCoffee').doc(id);
  const doc = await ref.get();
  if (!doc.exists || doc.data().userId !== userId) {
    const err = new Error('Not found or unauthorized');
    err.statusCode = 404;
    throw err;
  }
  // 재계산
  const data = {
    brewMethod: updates.brewMethod || doc.data().brewMethod,
    beansG: updates.beansG || doc.data().beansG,
    beanType: updates.beanType || doc.data().beanType
  };
  updates.caffeineMg = calculateCustomCaffeine(data);
  updates.timestamp = new Date();
  await ref.update(updates);
  const updated = await ref.get();
  return { id: updated.id, ...updated.data() };
}

/**
 * 단일 레코드 삭제
 */
async function deleteCustomCoffee(userId, id) {
  const ref = db.collection('customCoffee').doc(id);
  const doc = await ref.get();
  if (!doc.exists || doc.data().userId !== userId) {
    const err = new Error('Not found or unauthorized');
    err.statusCode = 404;
    throw err;
  }
  await ref.delete();
  return { id };
}

module.exports = {
  calculateCustomCaffeine,
  saveCustomCoffeeRecord,
  getCustomCoffees,
  updateCustomCoffee,
  deleteCustomCoffee
};
