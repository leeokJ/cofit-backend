const DrinkService = require('../services/DrinkService');
const service      = new DrinkService();

exports.createDrink = async (req, res, next) => {
  try {
    const id = await service.createDrink(req.body);
    res.status(201).json({ success: true, data: id });
  } catch (err) {
    next(err);
  }
};

exports.getAllDrinks = async (req, res, next) => {
  try {
    const list = await service.getAllDrinks();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};

exports.getDrink = async (req, res, next) => {
  try {
    const item = await service.getDrinkById(req.params.drinkid);
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.updateDrink = async (req, res, next) => {
  try {
    const updated = await service.updateDrink(req.params.drinkid, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteDrink = async (req, res, next) => {
  try {
    await service.deleteDrink(req.params.drinkid);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
