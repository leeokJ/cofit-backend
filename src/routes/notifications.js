const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, ctrl.createNotification);
router.get('/', authMiddleware, ctrl.getNotifications);
router.get('/:notificationid', authMiddleware, ctrl.getNotification);
router.put('/:notificationid', authMiddleware, ctrl.updateNotification);
router.delete('/:notificationid', authMiddleware, ctrl.deleteNotification);

module.exports = router;
