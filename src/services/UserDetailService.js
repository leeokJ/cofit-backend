const UserDetailDAO = require('../dao/UserDetailDAO');
const UserDetail    = require('../models/UserDetail');

class UserDetailService {
  constructor() {
    this.dao = new UserDetailDAO();
  }

  async createDetail(data) {
    const detail = new UserDetail(data);
    const { isValid, errors } = detail.validate();
    if (!isValid) throw new Error(errors.join(', '));

    detail.created_at = new Date();
    detail.updated_at = new Date();
    return this.dao.create(detail.toFirestoreData());
  }

  async getAllDetails() {
    return this.dao.findAll();
  }

  async getDetailByUserId(userId) {
    const doc = await this.dao.findByUserId(userId);
    if (!doc) throw new Error('UserDetail not found');
    return doc;
  }

  async updateDetail(id, updates) {
    updates.updated_at = new Date();
    return this.dao.update(id, updates);
  }

  async deleteDetail(id) {
    return this.dao.delete(id);
  }
}

module.exports = UserDetailService;
