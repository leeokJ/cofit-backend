const path = require('path');
const admin = require('firebase-admin');

const serviceAccountPath = path.resolve(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS);
const serviceAccount = require(serviceAccountPath);

console.log('Service Account Path:', serviceAccountPath);
console.log('Project ID:', serviceAccount.project_id);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: serviceAccount.project_id,  // ← ENV 대신 JSON에서 직접 읽기
});

const db = admin.firestore();
const messaging = admin.messaging();

module.exports = { db, admin, messaging };
