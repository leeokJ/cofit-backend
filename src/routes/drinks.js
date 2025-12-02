const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/drinkController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, ctrl.createDrink);
router.get('/', authMiddleware, ctrl.getAllDrinks);
router.get('/:drinkid', authMiddleware, ctrl.getDrink);
router.put('/:drinkid', authMiddleware, ctrl.updateDrink);
router.delete('/:drinkid', authMiddleware, ctrl.deleteDrink);

module.exports = router;
