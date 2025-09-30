const NotificationDAO = require('../dao/NotificationDAO');
const Notification    = require('../models/Notification');

class NotificationService {
  constructor() {
    this.dao = new NotificationDAO();
  }

  async createNotification(data) {
    const n = new Notification(data);
    const { isValid, errors } = n.validate();
    if (!isValid) throw new Error(errors.join(', '));
    n.created_at = new Date();
    n.updated_at = new Date();
    return this.dao.create(n.toFirestoreData());
  }

  async getAllNotifications() {
    return this.dao.findAll();
  }

  async getNotificationsByUser(userId) {
    return this.dao.findByUserId(userId);
  }

  async getNotificationById(id) {
    const doc = await this.dao.findById(id);
    if (!doc) throw new Error('Notification not found');
    return doc;
  }

  async updateNotification(id, updates) {
    updates.updated_at = new Date();
    return this.dao.update(id, updates);
  }

  async deleteNotification(id) {
    return this.dao.delete(id);
  }
}

module.exports = NotificationService;
