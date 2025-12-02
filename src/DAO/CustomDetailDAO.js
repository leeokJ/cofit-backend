const BaseDAO = require('./BaseDAO');

class CustomDetailDAO extends BaseDAO {
  constructor() {
    super('custom_details');
  }

  async findByDrinkId(drinkId) {
    const results = await this.findWhere('drink_id', '==', drinkId);
    return results[0] || null;
  }
}

module.exports = CustomDetailDAO;
