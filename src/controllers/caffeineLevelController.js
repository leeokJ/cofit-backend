const CaffeineLevelService = require('../services/CaffeineLevelService');
const service = new CaffeineLevelService();

exports.createCaffeineLevel = async (req, res, next) => {
  try {
    const result = await service.createLevel(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

exports.getCaffeineLevel = async (req, res, next) => {
  try {
    const level = await service.getLevelById(req.params.recordid);
    res.json({ success: true, data: level });
  } catch (err) {
    next(err);
  }
};

exports.getCaffeineLevelsByUser = async (req, res, next) => {
  try {
    const levels = await service.getLevelsByUser(req.params.userid);
    res.json({ success: true, data: levels });
  } catch (err) {
    next(err);
  }
};

exports.updateCaffeineLevel = async (req, res, next) => {
  try {
    const updated = await service.updateLevel(req.params.recordid, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteCaffeineLevel = async (req, res, next) => {
  try {
    await service.deleteLevel(req.params.recordid);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
