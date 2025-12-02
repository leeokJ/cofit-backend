const NotificationService = require('../services/NotificationService');
const service             = new NotificationService();

exports.createNotification = async (req, res, next) => {
  try {
    const id = await service.createNotification(req.body);
    res.status(201).json({ success: true, data: id });
  } catch (err) {
    next(err);
  }
};

exports.getNotifications = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    const list = user_id
      ? await service.getNotificationsByUser(user_id)
      : await service.getAllNotifications();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};

exports.getNotification = async (req, res, next) => {
  try {
    const item = await service.getNotificationById(req.params.notificationid);
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.updateNotification = async (req, res, next) => {
  try {
    const updated = await service.updateNotification(req.params.notificationid, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    await service.deleteNotification(req.params.notificationid);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
