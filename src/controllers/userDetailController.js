const UserDetailService = require('../services/UserDetailService');
const service           = new UserDetailService();

exports.getAllUserDetails = async (_req, res, next) => {
  try {
    const list = await service.getAllDetails();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};

exports.createUserDetail = async (req, res, next) => {
  try {
    const result = await service.createDetail(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

exports.getUserDetail = async (req, res, next) => {
  try {
    const detail = await service.getDetailByUserId(req.params.userid);
    res.json({ success: true, data: detail });
  } catch (err) {
    next(err);
  }
};

exports.updateUserDetail = async (req, res, next) => {
  try {
    const updated = await service.updateDetail(req.params.userid, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteUserDetail = async (req, res, next) => {
  try {
    await service.deleteDetail(req.params.userid);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
