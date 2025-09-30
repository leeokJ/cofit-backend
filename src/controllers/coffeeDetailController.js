const CoffeeDetailService = require('../services/CoffeeDetailService');
const service = new CoffeeDetailService();

exports.getAllCoffeeDetails = async (_req, res, next) => {
  try {
    const list = await service.getAllDetails();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};

exports.createCoffeeDetail = async (req, res, next) => {
  try {
    const result = await service.createDetail(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

exports.getCoffeeDetail = async (req, res, next) => {
  try {
    const detail = await service.getDetailById(req.params.coffeeid);
    res.json({ success: true, data: detail });
  } catch (err) {
    next(err);
  }
};

exports.updateCoffeeDetail = async (req, res, next) => {
  try {
    const updated = await service.updateDetail(req.params.coffeeid, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteCoffeeDetail = async (req, res, next) => {
  try {
    await service.deleteDetail(req.params.coffeeid);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
