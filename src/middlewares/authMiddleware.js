// src/middlewares/authMiddleware.js
const { admin } = require('../config/firebase');  // ← 이것으로 바꾸기!

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({ error: '토큰이 필요합니다.' });
    }

    // Firebase Admin SDK로 검증
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    req.user = { uid: decodedToken.uid, email: decodedToken.email };
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
  }
};

module.exports = authMiddleware;
