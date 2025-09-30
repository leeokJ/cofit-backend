const { db } = require('../config/firebase');

class BaseDAO {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  async create(data) {
    const docRef = await this.collection.add(data);
    return { id: docRef.id, ...data };
  }

  async findById(id) {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async findAll() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async update(id, data) {
    await this.collection.doc(id).update(data);
    return { id, ...data };
  }

  async delete(id) {
    await this.collection.doc(id).delete();
    return { success: true };
  }

  async findWhere(field, op, val) {
    const snapshot = await this.collection.where(field, op, val).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = BaseDAO;
