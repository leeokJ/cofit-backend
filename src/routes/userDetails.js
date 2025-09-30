const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/userDetailController');

router.get('/',          ctrl.getAllUserDetails);
router.post('/',         ctrl.createUserDetail);
router.get('/:userid',   ctrl.getUserDetail);
router.put('/:userid',   ctrl.updateUserDetail);
router.delete('/:userid',ctrl.deleteUserDetail);

module.exports = router;
