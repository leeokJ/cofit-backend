const BaseDAO = require('./BaseDAO');

class DrinkLogDAO extends BaseDAO {
  constructor() {
    super('drink_logs');
  }

  async findByUserId(userId) {
    return this.findWhere('user_id', '==', userId);
  }
}

module.exports = DrinkLogDAO;
