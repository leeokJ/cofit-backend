const IntakeService = require('../services/IntakeService');
const service = new IntakeService();

exports.createIntake = async (req, res, next) => {
  try {
    console.log('요청 받음:', req.body);
    console.log('user:', req.user);
    
    req.body.userId = req.user.uid;
    console.log('userId 설정:', req.user.uid);
    
    const result = await service.createIntake(req.body);
    console.log('저장 결과:', result);
    
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    console.error('에러:', err.message);
    next(err);
  }
};

exports.getAllIntakes = async (req, res, next) => {
  try {
    const list = await service.getAllIntakes(req.user.uid);
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};

exports.getIntake = async (req, res, next) => {
  try {
    const item = await service.getIntakeById(req.params.intakeid);
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.updateIntake = async (req, res, next) => {
  try {
    req.body.updated_at = new Date();
    const updated = await service.updateIntake(req.params.intakeid, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteIntake = async (req, res, next) => {
  try {
    await service.deleteIntake(req.params.intakeid);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getIntakesByDrinkId = async (req, res, next) => {
  try {
    const list = await service.getIntakesByDrinkId(req.params.drinkid);
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};

exports.getIntakesByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const list = await service.getIntakesByDateRange(
      req.user.uid,
      new Date(startDate),
      new Date(endDate)
    );
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};
