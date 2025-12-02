const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/userDetailController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

router.get('/', authMiddleware, ctrl.getAllUserDetails);
router.post('/', authMiddleware, ctrl.createUserDetail);
router.get('/:userid', authMiddleware, ctrl.getUserDetail);
router.put('/:userid', authMiddleware, authorizationMiddleware, ctrl.updateUserDetail);
router.delete('/:userid', authMiddleware, authorizationMiddleware, ctrl.deleteUserDetail);

module.exports = router;
