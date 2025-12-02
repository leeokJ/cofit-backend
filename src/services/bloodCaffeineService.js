// src/services/bloodCaffeineService.js

const { db } = require('../config/firebase');

// 보정계수
const ADJUST = {
  baseHalfLife: 4,
  smoking: 0.9,
  pregnancy: 1.5,
  age65: 1.2,
  liver: 1.5
};

function calcEliminationRate(halfLife) {
  return Math.log(2) / halfLife;
}

function calcEffectiveHalfLife(opts, excludeAdjust = true) {
  if (excludeAdjust) return ADJUST.baseHalfLife;
  let t = ADJUST.baseHalfLife;
  if (opts.smoking)      t *= ADJUST.smoking;
  if (opts.pregnant)     t *= ADJUST.pregnancy;
  if (opts.age >= 65)    t *= ADJUST.age65;
  if (opts.liverDisease) t *= ADJUST.liver;
  return t;
}

function calcConcentration({ dose, volumeL, rateK, deltaH }) {
  return (dose / volumeL) * Math.exp(-rateK * deltaH);
}

/**
 * excludeAdjust: true일 때 보정계수 제외(기본 반감기만),
 * false일 때 보정계수 모두 적용
 */
function calculateBloodLevels(
  { intakeTime, caffeineMg, smoking, pregnant, age, liverDisease, weightKg },
  excludeAdjust = true
) {
  const now = new Date();
  const deltaH = (now - new Date(intakeTime)) / 36e5; // ms → 시간

  // 보정계수 적용 여부에 따라 반감기 계산
  const halfLife = calcEffectiveHalfLife(
    { smoking, pregnant, age, liverDisease },
    excludeAdjust
  );
  const k = calcEliminationRate(halfLife);
  const Vd = 0.6 * weightKg;
  const concentrationMgPerL = calcConcentration({
    dose: caffeineMg,
    volumeL: Vd,
    rateK: k,
    deltaH
  });

  return {
    concentrationMgPerL: Number(concentrationMgPerL.toFixed(3)),
    halfLifeH: halfLife,
    eliminationRate: Number(k.toFixed(5)),
    deltaHours: Number(deltaH.toFixed(3))
  };
}

async function saveBloodRecord(userId, params) {
  const docRef = await db.collection('bloodCaffeine').add({
    userId,
    ...params,
    timestamp: new Date()
  });
  const snap = await docRef.get();
  return { id: docRef.id, ...snap.data() };
}

async function getBloodRecords(userId) {
  const snapshot = await db
    .collection('bloodCaffeine')
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function updateBloodRecord(userId, recordId, updateData) {
  const docRef = db.collection('bloodCaffeine').doc(recordId);
  const snapshot = await docRef.get();
  if (!snapshot.exists) {
    const err = new Error('Record not found');
    err.statusCode = 404;
    throw err;
  }
  if (snapshot.data().userId !== userId) {
    const err = new Error('Not authorized');
    err.statusCode = 403;
    throw err;
  }
  await docRef.update(updateData);
  const updatedSnap = await docRef.get();
  return { id: recordId, ...updatedSnap.data() };
}

async function deleteBloodRecord(userId, recordId) {
  const docRef = db.collection('bloodCaffeine').doc(recordId);
  const snapshot = await docRef.get();
  if (!snapshot.exists) {
    const err = new Error('Record not found');
    err.statusCode = 404;
    throw err;
  }
  if (snapshot.data().userId !== userId) {
    const err = new Error('Not authorized');
    err.statusCode = 403;
    throw err;
  }
  await docRef.delete();
  return { id: recordId };
}

module.exports = {
  calculateBloodLevels,
  saveBloodRecord,
  getBloodRecords,
  updateBloodRecord,
  deleteBloodRecord
};
