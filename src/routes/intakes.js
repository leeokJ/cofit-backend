const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/IntakeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, ctrl.createIntake);
router.get('/', authMiddleware, ctrl.getAllIntakes);
router.get('/:intakeid', authMiddleware, ctrl.getIntake);
router.put('/:intakeid', authMiddleware, ctrl.updateIntake);
router.delete('/:intakeid', authMiddleware, ctrl.deleteIntake);
router.get('/drink/:drinkid', authMiddleware, ctrl.getIntakesByDrinkId);

module.exports = router;
