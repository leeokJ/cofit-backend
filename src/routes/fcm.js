const express = require('express');
const router  = express.Router();
const { registerToken, sendNotification } = require('../controllers/pushController');

router.post('/token/:userId', registerToken);
router.post('/send/:userId',  sendNotification);

module.exports = router;
