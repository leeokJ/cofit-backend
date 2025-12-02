// src/services/pushService.js
const { admin } = require('../config/firebase');

exports.sendPushNotification = async (payload) => {
  try {
    const message = {
      token: payload.token,
      notification: payload.notification,
      data: payload.data || {}
    };
    // admin.messaging() 사용
    const response = await admin.messaging().send(message);
    console.log('Successfully sent push:', response);
    return response;
  } catch (error) {
    console.error('Error sending push:', error);
    throw error;
  }
};
