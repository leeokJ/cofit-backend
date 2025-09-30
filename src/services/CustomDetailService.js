const CustomDetailDAO = require('../dao/CustomDetailDAO');
const CustomDetail    = require('../models/CustomDetail');

class CustomDetailService {
  constructor() {
    this.dao = new CustomDetailDAO();
  }

  async createDetail(data) {
    const detail = new CustomDetail(data);
    const { isValid, errors } = detail.validate();
    if (!isValid) throw new Error(errors.join(', '));

    detail.created_at = new Date();
    detail.updated_at = new Date();
    return this.dao.create({ 
      drink_id: detail.drink_id,
      ...detail.toFirestoreData()
    });
  }

  async getAllDetails() {
    return this.dao.findAll();
  }

  async getDetailById(drinkId) {
    const doc = await this.dao.findById(drinkId);
    if (!doc) throw new Error('CustomDetail not found');
    return doc;
  }

  async updateDetail(drinkId, updates) {
    updates.updated_at = new Date();
    return this.dao.update(drinkId, updates);
  }

  async deleteDetail(drinkId) {
    return this.dao.delete(drinkId);
  }
}

module.exports = CustomDetailService;
