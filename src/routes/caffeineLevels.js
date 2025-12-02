const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/caffeineLevelController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, ctrl.createCaffeineLevel);
router.get('/user/:userid', authMiddleware, ctrl.getCaffeineLevelsByUser);
router.get('/:recordid', authMiddleware, ctrl.getCaffeineLevel);
router.put('/:recordid', authMiddleware, ctrl.updateCaffeineLevel);
router.delete('/:recordid', authMiddleware, ctrl.deleteCaffeineLevel);

module.exports = router;
