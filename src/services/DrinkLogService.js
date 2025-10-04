const DrinkLogDAO = require('../dao/DrinkLogDAO');
const DrinkLog    = require('../models/DrinkLog');

class DrinkLogService {
  constructor() {
    this.dao = new DrinkLogDAO();
  }

  async createLog(data) {
    const log = new DrinkLog(data);
    const { isValid, errors } = log.validate();
    if (!isValid) throw new Error(errors.join(', '));

    log.created_at = new Date();
    log.updated_at = new Date();
    return this.dao.create(log.toFirestoreData());
  }

  async getLogById(id) {
    const doc = await this.dao.findById(id);
    if (!doc) throw new Error('DrinkLog not found');
    return doc;
  }

  async getLogsByUser(userId) {
    return this.dao.findByUserId(userId);
  }

  async updateLog(id, updates) {
    updates.updated_at = new Date();
    return this.dao.update(id, updates);
  }

  async deleteLog(id) {
    return this.dao.delete(id);
  }
  
  async getAllDrinkLogs() {
    return this.dao.findAll();
  }
}

module.exports = DrinkLogService;
