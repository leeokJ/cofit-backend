const NotificationSettingService = require('../services/NotificationSettingService');
const service = new NotificationSettingService();

// 사용자의 알림 설정 조회
exports.getNotificationSetting = async (req, res, next) => {
  try {
    const userId = req.params.userid;
    const setting = await service.getSettingByUserId(userId);
    res.json({ success: true, data: setting });
  } catch (err) {
    next(err);
  }
};

// 사용자의 알림 설정 생성
exports.createNotificationSetting = async (req, res, next) => {
  try {
    const result = await service.createSetting(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

// 사용자의 알림 설정 업데이트
exports.updateNotificationSetting = async (req, res, next) => {
  try {
    const settingId = req.params.settingid;
    const updated = await service.updateSetting(settingId, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

// 사용자의 알림 설정 삭제
exports.deleteNotificationSetting = async (req, res, next) => {
  try {
    const settingId = req.params.settingid;
    await service.deleteSetting(settingId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
