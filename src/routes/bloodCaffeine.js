// src/routes/bloodCaffeine.js

const express = require('express');
const router = express.Router();
const {
  calculateBloodLevels,
  saveBloodRecord,
  getBloodRecords,
  updateBloodRecord,
  deleteBloodRecord
} = require('../services/bloodCaffeineService');

/**
 * POST /bloodCaffeine
 * Body: {
 *   userId,
 *   intakeTime,
 *   caffeineMg,
 *   smoking,
 *   pregnant,
 *   age,
 *   liverDisease,
 *   weightKg,
 *   excludeAdjust  // optional boolean, 기본 true
 * }
 */
router.post('/', async (req, res, next) => {
  try {
    const {
      userId,
      intakeTime,
      caffeineMg,
      smoking,
      pregnant,
      age,
      liverDisease,
      weightKg,
      excludeAdjust = true
    } = req.body;

    // excludeAdjust가 false일 때만 보정계수 적용
    const result = calculateBloodLevels(
      { intakeTime, caffeineMg, smoking, pregnant, age, liverDisease, weightKg },
      excludeAdjust
    );

    const record = await saveBloodRecord(userId, {
      intakeTime,
      caffeineMg,
      smoking,
      pregnant,
      age,
      liverDisease,
      weightKg,
      excludeAdjust,
      ...result
    });

    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /bloodCaffeine?userId=USER_ID
 */
router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId required' });
    }
    const records = await getBloodRecords(userId);
    res.json(records);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /bloodCaffeine/:id
 * Body: { userId, ...updateData }
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { userId, ...updateData } = req.body;
    const { id } = req.params;
    const updated = await updateBloodRecord(userId, id, updateData);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /bloodCaffeine/:id?userId=USER_ID
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { userId } = req.query;
    const { id } = req.params;
    const result = await deleteBloodRecord(userId, id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
