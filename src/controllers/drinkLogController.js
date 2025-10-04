const DrinkLogService = require('../services/DrinkLogService');
const service         = new DrinkLogService();

exports.createDrinkLog = async (req, res, next) => {
  try {
    const id = await service.createLog(req.body);
    res.status(201).json({ success: true, data: id });
  } catch (err) {
    next(err);
  }
};

exports.getDrinkLog = async (req, res, next) => {
  try {
    const log = await service.getLogById(req.params.logid);
    res.json({ success: true, data: log });
  } catch (err) {
    next(err);
  }
};

exports.getDrinkLogsByUser = async (req, res, next) => {
  try {
    const logs = await service.getLogsByUser(req.params.userid);
    res.json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
};

exports.updateDrinkLog = async (req, res, next) => {
  try {
    const updated = await service.updateLog(req.params.logid, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteDrinkLog = async (req, res, next) => {
  try {
    await service.deleteLog(req.params.logid);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getAllDrinkLogs = async (req, res, next) => {
   try {
     const list = await service.getAllDrinkLogs();
      res.status(200).json({ success: true, data: list });
    } catch (err) {
      next(err);
    }
};
