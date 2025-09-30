const CustomDetailService = require('../services/CustomDetailService');
const service = new CustomDetailService();

exports.getAllCustomDetails = async (_req, res, next) => {
  try {
    const list = await service.getAllDetails();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};

exports.createCustomDetail = async (req, res, next) => {
  try {
    const result = await service.createDetail(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

exports.getCustomDetail = async (req, res, next) => {
  try {
    const detail = await service.getDetailById(req.params.customid);
    res.json({ success: true, data: detail });
  } catch (err) {
    next(err);
  }
};

exports.updateCustomDetail = async (req, res, next) => {
  try {
    const updated = await service.updateDetail(req.params.customid, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteCustomDetail = async (req, res, next) => {
  try {
    await service.deleteDetail(req.params.customid);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
