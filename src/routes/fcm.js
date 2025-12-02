const express = require('express');
const router  = express.Router();
const { registerToken, sendNotification } = require('../controllers/pushController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/token/:userId', authMiddleware, registerToken);
router.post('/send/:userId', authMiddleware, sendNotification);

module.exports = router;
