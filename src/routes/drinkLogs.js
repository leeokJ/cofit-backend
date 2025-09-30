const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/drinkLogController');

router.post('/',        ctrl.createDrinkLog);
router.get('/:logid',   ctrl.getDrinkLog);
router.get('/user/:userid', ctrl.getDrinkLogsByUser);
router.put('/:logid',   ctrl.updateDrinkLog);
router.delete('/:logid',ctrl.deleteDrinkLog);

module.exports = router;
