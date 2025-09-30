const CaffeineLevelDAO = require('../dao/CaffeineLevelDAO');
const CaffeineLevel    = require('../models/CaffeineLevel');

class CaffeineLevelService {
  constructor() {
    this.dao = new CaffeineLevelDAO();
  }

  async createLevel(data) {
    const level = new CaffeineLevel(data);
    const { isValid, errors } = level.validate();
    if (!isValid) throw new Error(errors.join(', '));

    level.created_at = new Date();
    level.updated_at = new Date();
    return this.dao.create(level.toFirestoreData());
  }

  async getLevelById(id) {
    const doc = await this.dao.findById(id);
    if (!doc) throw new Error('CaffeineLevel not found');
    return doc;
  }

  async getLevelsByUser(userId) {
    return this.dao.findByUserId(userId);
  }

  async updateLevel(id, updates) {
    updates.updated_at = new Date();
    return this.dao.update(id, updates);
  }

  async deleteLevel(id) {
    return this.dao.delete(id);
  }
}

module.exports = CaffeineLevelService;
