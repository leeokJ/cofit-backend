const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const sleepController = require('../controllers/sleepController');

// POST /api/sleep/caffeine-impact
router.post(
  '/caffeine-impact',
  authMiddleware,
  sleepController.getSleepCaffeineImpact.bind(sleepController)
);

module.exports = router;
