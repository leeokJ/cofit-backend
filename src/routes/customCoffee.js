// src/routes/customCoffee.js

const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const {
  calculateCustomCaffeine,
  saveCustomCoffeeRecord,
  getCustomCoffees,
  updateCustomCoffee,
  deleteCustomCoffee
} = require('../services/customCoffeeService');

/**
 * POST /customCoffee
 */
router.post('/', async (req, res, next) => {
  try {
    const { userId, brewMethod, beansG, beanType } = req.body;
    if (!userId || !brewMethod || beansG == null || !beanType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const caffeineMg = calculateCustomCaffeine({ brewMethod, beansG, beanType });
    const record = await saveCustomCoffeeRecord(userId, {
      brewMethod,
      beansG,
      beanType,
      caffeineMg
    });
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /customCoffee?userId=USER_ID
 */
router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId required' });
    }
    const list = await getCustomCoffees(userId);
    res.json(list);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /customCoffee/:id?userId=USER_ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { userId } = req.query;
    const { id } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'userId required' });
    }

    const doc = await db.collection('customCoffee').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const data = doc.data();
    if (data.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ id: doc.id, ...data });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /customCoffee/:id
 * Body: { userId, brewMethod?, beansG?, beanType? }
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { userId, ...updates } = req.body;
    const { id } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'userId required' });
    }
    const updated = await updateCustomCoffee(userId, id, updates);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /customCoffee/:id?userId=USER_ID
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { userId } = req.query;
    const { id } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'userId required' });
    }
    const result = await deleteCustomCoffee(userId, id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
