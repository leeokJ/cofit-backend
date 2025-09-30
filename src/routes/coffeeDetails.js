const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/coffeeDetailController');

router.get('/',        ctrl.getAllCoffeeDetails);
router.post('/',       ctrl.createCoffeeDetail);
router.get('/:coffeeid', ctrl.getCoffeeDetail);
router.put('/:coffeeid', ctrl.updateCoffeeDetail);
router.delete('/:coffeeid', ctrl.deleteCoffeeDetail);

module.exports = router;
