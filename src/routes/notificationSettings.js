const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/notificationSettingController');
const authMiddleware = require('../middlewares/authMiddleware');

// 사용자의 알림 설정 조회
router.get('/:userid', authMiddleware, ctrl.getNotificationSetting);

// 알림 설정 생성
router.post('/', authMiddleware, ctrl.createNotificationSetting);

// 알림 설정 업데이트
router.put('/:settingid', authMiddleware, ctrl.updateNotificationSetting);

// 알림 설정 삭제
router.delete('/:settingid', authMiddleware, ctrl.deleteNotificationSetting);

module.exports = router;
