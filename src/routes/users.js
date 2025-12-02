const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

router.post('/', authMiddleware, ctrl.createUser);
router.get('/', authMiddleware, ctrl.getUsers);
router.get('/:userid', authMiddleware, ctrl.getUserById);
router.put('/:userid', authMiddleware, authorizationMiddleware, ctrl.updateUser);
router.delete('/:userid', authMiddleware, authorizationMiddleware, ctrl.deleteUser);

//FCM 토큰 업데이트
router.post('/:userid/fcmToken', authMiddleware, ctrl.updateFcmToken);

module.exports = router;
