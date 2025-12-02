const BaseDAO = require('./BaseDAO');

class NotificationSettingDAO extends BaseDAO {
  constructor() {
    super('notification_settings');
  }

  // 사용자의 알림 설정 조회
  async findByUserId(userId) {
    const results = await this.findWhere('user_id', '==', userId);
    return results[0] || null;
  }
}

module.exports = NotificationSettingDAO;
