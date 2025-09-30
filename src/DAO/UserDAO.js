const BaseDAO = require('./BaseDAO');

class UserDAO extends BaseDAO {
  constructor() {
    super('users');
  }

  async findByEmail(email) {
    const results = await this.findWhere('email', '==', email);
    return results[0] || null;
  }
}

module.exports = UserDAO;
