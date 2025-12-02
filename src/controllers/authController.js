// src/controllers/authController.js
const axios = require('axios');
const { admin, db } = require('../config/firebase');

const FIREBASE_REST_API = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
const FIREBASE_REST_OOB = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode';
const FIREBASE_WEB_API_KEY = process.env.FIREBASE_WEB_API_KEY;

exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      passwordConfirm,
      name,
      weight,
      gender,
      smoker,
      liverDisease,
      pregnantOrPills,
      birthDate,
      sleepTime,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "이메일과 비밀번호는 필수입니다." });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ error: "비밀번호가 일치하지 않습니다." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "유효한 이메일 형식이 아닙니다." });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: '유효한 이메일 형식이 아닙니다.' });
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name || "",
    });

    await db.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      name,
      weight,
      gender,
      smoker,
      liverDisease,
      pregnantOrPills,
      birthDate,
      sleepTime,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "회원가입 완료!",
      uid: userRecord.uid,
      email,
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "이메일과 비밀번호는 필수입니다." });
    }

    // ✅ Firebase REST API로 비밀번호 검증 (수정됨)
    const response = await axios.post(
      `${FIREBASE_REST_API}?key=${FIREBASE_WEB_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const { localId, idToken, refreshToken } = response.data;

    // ✅ CustomToken 생성 (수정됨)
    const customToken = await admin.auth().createCustomToken(localId);

    res.status(200).json({
      message: '로그인 완료!',
      idToken,
      refreshToken,
      customToken,
      uid: localId,
      email: email,
    });
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    
    // ✅ 상세한 에러 처리 (추가됨)
    if (error.response?.data?.error?.message === 'INVALID_PASSWORD') {
      return res.status(401).json({ error: '비밀번호가 잘못되었습니다.' });
    }
    if (error.response?.data?.error?.message === 'EMAIL_NOT_FOUND') {
      return res.status(401).json({ error: '존재하지 않는 이메일입니다.' });
    }
    
    return res.status(401).json({ 
      error: '로그인 실패: 이메일 또는 비밀번호를 확인하세요.' 
    });
  }
};

exports.validate = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      valid: true,
      userId: user.uid,
      email: user.email,
    });
  } catch (error) {
    console.error("Validate error:", error.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.validateToken = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: {
        uid: req.user.uid,
        valid: true,
      },
    });
  } catch (err) {
    next(err);
  }
};

// 기존 코드 아래에 추가
exports.sendPasswordResetEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. 이메일 유효성 검사
    if (!email || !email.includes('@')) {
      return res.status(400).json({ 
        error: "올바른 이메일 형식이 아닙니다." 
      });
    }

    // 2. 사용자 존재 확인
    try {
      await admin.auth().getUserByEmail(email);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return res.status(400).json({ 
          error: "등록되지 않은 이메일입니다." 
        });
      }
      throw error;
    }

    // 비밀번호 재설정 이메일 보내달라"고 요청
    const response = await axios.post(
      `${FIREBASE_REST_OOB}?key=${FIREBASE_WEB_API_KEY}`,
      {
        requestType: 'PASSWORD_RESET',
        email: email,
      }
    );

    // 3. Firebase가 자동으로 비밀번호 재설정 이메일 발송
    res.json({ 
      success: true, 
      message: "비밀번호 재설정 이메일이 발송되었습니다."
    });
  } catch (error) {
    console.error('Password reset error:', error.message);
    res.status(500).json({ 
      error: "이메일 발송 중 오류가 발생했습니다." 
    });
  }
};

// confirmPasswordReset 함수 추가
exports.confirmPasswordReset = async (req, res) => {
  try {
    const { oobCode, newPassword } = req.body;

    if (!oobCode || !newPassword) {
      return res.status(400).json({ 
        error: "oobCode와 새 비밀번호는 필수입니다." 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        error: "비밀번호는 최소 6자 이상이어야 합니다." 
      });
    }

    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${FIREBASE_WEB_API_KEY}`,
      {
        oobCode: oobCode,
        newPassword: newPassword,
      }
    );

    const { email, localId } = response.data;

    res.json({ 
      success: true, 
      message: "비밀번호가 변경되었습니다.",
      email: email,
      uid: localId,
    });
  } catch (error) {
    console.error('Confirm password reset error:', error.response?.data || error.message);
    
    if (error.response?.data?.error?.message === 'INVALID_OOB_CODE') {
      return res.status(400).json({ 
        error: "유효하지 않거나 만료된 재설정 링크입니다." 
      });
    }
    
    res.status(500).json({ 
      error: "비밀번호 변경 중 오류가 발생했습니다." 
    });
  }
};


