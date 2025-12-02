const NotificationSettingDAO = require('../dao/NotificationSettingDAO');
const NotificationSetting = require('../models/NotificationSetting');

class NotificationSettingService {
  constructor() {
    this.dao = new NotificationSettingDAO();
  }

  // 사용자의 알림 설정 조회
  async getSettingByUserId(userId) {
    const setting = await this.dao.findByUserId(userId);
    if (!setting) throw new Error('알림 설정이 없습니다.');
    return setting;
  }

  // 사용자의 알림 설정 생성
  async createSetting(data) {
    const setting = new NotificationSetting(data);
    const { isValid, errors } = setting.validate();
    if (!isValid) throw new Error(errors.join(', '));

    setting.created_at = new Date();
    setting.updated_at = new Date();
    return this.dao.create(setting.toFirestoreData());
  }

  // 사용자의 알림 설정 업데이트
  async updateSetting(settingId, updates) {
    updates.updated_at = new Date();
    return this.dao.update(settingId, updates);
  }

  // 사용자의 알림 설정 삭제
  async deleteSetting(settingId) {
    return this.dao.delete(settingId);
  }
}

module.exports = NotificationSettingService;
