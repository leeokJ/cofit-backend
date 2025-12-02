const UserService = require('../services/UserService');
const service     = new UserService();

exports.createUser = async (req, res, next) => {
  try {
    const result = await service.createUser(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const list = await service.getAllUsers();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const u = await service.getUserById(req.params.userid);
    res.json({ success: true, data: u });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updated = await service.updateUser(req.params.userid, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await service.deleteUser(req.params.userid);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// FCM 토큰 업데이트
exports.updateFcmToken = async (req, res, next) => {
  try {
    const { fcmToken } = req.body;
    const { userid } = req.params;
    
    if (!fcmToken) {
      return res.status(400).json({ success: false, error: 'fcmToken is required' });
    }
    
    const result = await service.updateFcmToken(userid, fcmToken);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
