const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/energyDetailController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, ctrl.getAllEnergyDetails);
router.post('/', authMiddleware, ctrl.createEnergyDetail);
router.get('/:drinkid', authMiddleware, ctrl.getEnergyDetail);
router.put('/:drinkid', authMiddleware, ctrl.updateEnergyDetail);
router.delete('/:drinkid', authMiddleware, ctrl.deleteEnergyDetail);

module.exports = router;
