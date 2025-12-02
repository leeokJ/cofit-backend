const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/customDetailController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, ctrl.getAllCustomDetails);
router.post('/', authMiddleware, ctrl.createCustomDetail);
router.get('/:customid', authMiddleware, ctrl.getCustomDetail);
router.put('/:customid', authMiddleware, ctrl.updateCustomDetail);
router.delete('/:customid', authMiddleware, ctrl.deleteCustomDetail);

module.exports = router;
