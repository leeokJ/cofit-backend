const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/coffeeDetailController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, ctrl.getAllCoffeeDetails);
router.post('/', authMiddleware, ctrl.createCoffeeDetail);
router.get('/:coffeeid', authMiddleware, ctrl.getCoffeeDetail);
router.put('/:coffeeid', authMiddleware, ctrl.updateCoffeeDetail);
router.delete('/:coffeeid', authMiddleware, ctrl.deleteCoffeeDetail);

module.exports = router;
