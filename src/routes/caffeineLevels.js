const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/caffeineLevelController');

router.post('/', ctrl.createCaffeineLevel);
router.get('/user/:userid', ctrl.getCaffeineLevelsByUser);
router.get('/:recordid', ctrl.getCaffeineLevel);
router.put('/:recordid', ctrl.updateCaffeineLevel);
router.delete('/:recordid', ctrl.deleteCaffeineLevel);

module.exports = router;
