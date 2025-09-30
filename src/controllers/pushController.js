const { db } = require('../config/firebase');
const pushService = require('../services/pushService');

// 디바이스 토큰 등록
exports.registerToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    await db.collection('users')
      .doc(req.params.userId)
      .collection('notifications')
      .doc('fcm')
      .set({ token }, { merge: true });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// 푸시 전송
exports.sendNotification = async (req, res, next) => {
  try {
    const { title, body, data } = req.body;
    const doc = await db.collection('users')
      .doc(req.params.userId)
      .collection('notifications')
      .doc('fcm')
      .get();

    if (!doc.exists || !doc.data().token) {
      return res.status(404).json({ error: 'FCM token not found' });
    }

    const payload = {
      token: doc.data().token,
      notification: { title, body },
      data: data || {}
    };

    const response = await pushService.sendPushNotification(payload);
    res.json({ success: true, data: response });
  } catch (err) {
    next(err);
  }
};
