const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/energyDetailController');

router.get('/',          ctrl.getAllEnergyDetails);
router.post('/',         ctrl.createEnergyDetail);
router.get('/:drinkid',  ctrl.getEnergyDetail);
router.put('/:drinkid',  ctrl.updateEnergyDetail);
router.delete('/:drinkid', ctrl.deleteEnergyDetail);

module.exports = router;
