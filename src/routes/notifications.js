const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/notificationController');

router.post('/',           ctrl.createNotification);
router.get('/',            ctrl.getNotifications);
router.get('/:notificationid', ctrl.getNotification);
router.put('/:notificationid', ctrl.updateNotification);
router.delete('/:notificationid', ctrl.deleteNotification);

module.exports = router;
