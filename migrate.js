// migrate.js
require('dotenv').config();
const db = require('./src/config/firebase');
const admin = require('firebase-admin');

async function migrate() {
  const snapshot = await db.collection('CaffeineLevel').get();
  for (const doc of snapshot.docs) {
    const data = doc.data();
    if (data.level_mg_per_l !== undefined) {
      await db.collection('CaffeineLevel').doc(doc.id).update({
        bcc_mg_per_l: data.level_mg_per_l
      });
      await db.collection('CaffeineLevel').doc(doc.id).update({
        level_mg_per_l: admin.firestore.FieldValue.delete()
      });
    }
  }
  console.log('Migration completed');
}

migrate().catch(console.error);
