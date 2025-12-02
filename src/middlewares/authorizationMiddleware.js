// src/middlewares/authorizationMiddleware.js
const authorizationMiddleware = (req, res, next) => {
  try {
    const { userid } = req.params;
    const { uid } = req.user;

    // 자신의 데이터만 접근 가능
    if (userid !== uid) {
      return res.status(403).json({ 
        error: '다른 사용자의 데이터에 접근할 수 없습니다.' 
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: '인가 처리 중 오류가 발생했습니다.' });
  }
};

module.exports = authorizationMiddleware;
