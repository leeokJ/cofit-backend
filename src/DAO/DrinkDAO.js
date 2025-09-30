const BaseDAO = require('./BaseDAO');

class DrinkDAO extends BaseDAO {
  constructor() {
    super('drinks');
  }

  async findByType(type) {
    return this.findWhere('drink_type', '==', type);
  }
}

module.exports = DrinkDAO;
