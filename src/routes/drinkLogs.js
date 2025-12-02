const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/drinkLogController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, ctrl.createDrinkLog);
router.get('/', authMiddleware, ctrl.getAllDrinkLogs);
router.get('/:logid', authMiddleware, ctrl.getDrinkLog);
router.get('/user/:userid', authMiddleware, ctrl.getDrinkLogsByUser);
router.put('/:logid', authMiddleware, ctrl.updateDrinkLog);
router.delete('/:logid', authMiddleware, ctrl.deleteDrinkLog);

module.exports = router;
