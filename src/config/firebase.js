// src/config/firebase.js
const path = require('path');
const admin = require('firebase-admin');

// env.js에서 이미 NODE_ENV에 맞는 .env.* 파일을 로드했으므로 dotenv 호출 불필요
// 서비스 계정 키 경로를 절대 경로로 변환
const serviceAccountPath = path.resolve(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS);
const serviceAccount = require(serviceAccountPath);

// 디버그 로그: 실제 파일 경로 확인
console.log('Service Account Path:', serviceAccountPath);

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   projectId: process.env.FIRESTORE_PROJECT_ID,
 });

const db = admin.firestore();
const messaging = admin.messaging();

module.exports = { db, admin, messaging };
//module.exports = { db, admin, messaging, auth: admin.auth() };

