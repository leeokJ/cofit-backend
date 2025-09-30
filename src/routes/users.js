const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/usersController');

router.post('/',       ctrl.createUser);
router.get('/',        ctrl.getUsers);
router.get('/:userid', ctrl.getUserById);
router.put('/:userid', ctrl.updateUser);
router.delete('/:userid', ctrl.deleteUser);

module.exports = router;
