const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/customDetailController');

router.get('/',        ctrl.getAllCustomDetails);
router.post('/',       ctrl.createCustomDetail);
router.get('/:customid', ctrl.getCustomDetail);
router.put('/:customid', ctrl.updateCustomDetail);
router.delete('/:customid', ctrl.deleteCustomDetail);

module.exports = router;
