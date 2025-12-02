const NotificationSettingDAO = require('../dao/NotificationSettingDAO');
const CaffeineLevelDAO = require('../dao/CaffeineLevelDAO');
const CaffeineLevel    = require('../models/CaffeineLevel');
const { messaging }    = require('../config/firebase'); 
const UserDAO          = require('../dao/UserDAO');

class CaffeineLevelService {
  constructor() {
    this.dao = new CaffeineLevelDAO();
    this.notificationSettingDAO = new NotificationSettingDAO();
    this.userDAO = new UserDAO();
  }

  async createLevel(data) {
    const level = new CaffeineLevel(data);
    const { isValid, errors } = level.validate();
    if (!isValid) throw new Error(errors.join(', '));

    level.created_at = new Date();
    level.updated_at = new Date();
    const result = await this.dao.create(level.toFirestoreData());
    await this.checkAndNotify(data.user_id, data.bcc_mg_per_l);
    
    return result;
  }

  async getLevelById(id) {
    const doc = await this.dao.findById(id);
    if (!doc) throw new Error('CaffeineLevel not found');
    return doc;
  }

  async getLevelsByUser(userId) {
    return this.dao.findByUserId(userId);
  }

  async updateLevel(id, updates) {
    updates.updated_at = new Date();
    return this.dao.update(id, updates);
  }

  async deleteLevel(id) {
    return this.dao.delete(id);
  }

  // ← 아래 메서드 추가 (FCM 푸시 발송)
  async sendPushNotification(userId, title, body) {
    try {
      const user = await this.userDAO.findById(userId);
      if (!user || !user.fcmToken) {
        console.log(`[FCM] No token for user: ${userId}`);
        return false;
      }

      const message = {
        token: user.fcmToken,
        notification: {
          title: title,
          body: body
        },
        data: {
          userId: userId,
          timestamp: new Date().toISOString()
        }
      };

      await messaging.send(message);
      console.log(`[FCM] Push sent to ${userId}`);
      return true;
    } catch (err) {
      console.error(`[FCM Error] ${err.message}`);
      return false;
    }
  }

  // 알림 확인 및 발송 로직 (수정)
  async checkAndNotify(userId, currentBcc) {
    try {
      const setting = await this.notificationSettingDAO.findByUserId(userId);
      
      if (!setting || !setting.is_enabled) {
        console.log(`[알림] 사용자 ${userId}의 알림 설정이 없거나 비활성화됨`);
        return;
      }

      if (currentBcc <= setting.bcc_threshold) {
        console.log(`[알림 발송] 사용자: ${userId}, 현재 BCC: ${currentBcc} mg/L <= 임계값: ${setting.bcc_threshold} mg/L`);
        // ← FCM 푸시 발송 추가
        await this.sendPushNotification(
          userId,
          '🚨 카페인 알림',
          `BCC가 ${setting.bcc_threshold}mg/L 이하로 내려갔습니다! (현재: ${currentBcc}mg/L)`
        );
      } else {
        console.log(`[알림 미발송] 사용자: ${userId}, 현재 BCC: ${currentBcc} > 임계값: ${setting.bcc_threshold}`);
      }
    } catch (err) {
      console.error(`[알림 오류] 사용자: ${userId}, 오류: ${err.message}`);
    }
  }
}

module.exports = CaffeineLevelService;
