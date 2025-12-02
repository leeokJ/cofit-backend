const BaseDAO = require('./BaseDAO');

class CoffeeDetailDAO extends BaseDAO {
  constructor() {
    super('coffee_details');
  }

  async findByDrinkId(drinkId) {
    const results = await this.findWhere('drink_id','==',drinkId);
    return results[0] || null;
  }
}

module.exports = CoffeeDetailDAO;
