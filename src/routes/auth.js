// src/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


// 회원가입
router.post('/register', authController.register);

// 로그인
router.post('/login', authController.login);

// 토큰 검증
router.get('/validate', authMiddleware, authController.validate);

// 토큰 검증 (새로운 POST) ← 추가만 하기
router.post('/validate', authMiddleware, authController.validateToken);

// 비밀번호 재설정 이메일 발송 
router.post('/password-reset', authController.sendPasswordResetEmail);

//비밀번호 변경
router.post('/confirm-password-reset', authController.confirmPasswordReset);


module.exports = router;
