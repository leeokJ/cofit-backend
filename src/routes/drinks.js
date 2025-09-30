const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/drinkController');

router.post('/',       ctrl.createDrink);
router.get('/',        ctrl.getAllDrinks);
router.get('/:drinkid',ctrl.getDrink);
router.put('/:drinkid',ctrl.updateDrink);
router.delete('/:drinkid',ctrl.deleteDrink);

module.exports = router;
