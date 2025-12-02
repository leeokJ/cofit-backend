const BaseDAO = require('./BaseDAO');

class UserDetailDAO extends BaseDAO {
  constructor() {
    super('user_details');
  }

  async findByUserId(userId) {
    const results = await this.findWhere('user_id', '==', userId);
    return results[0] || null;
  }
}

module.exports = UserDetailDAO;
