const BaseDAO = require('./BaseDAO');

class EnergyDetailDAO extends BaseDAO {
  constructor() {
    super('energy_details');
  }

  async findByDrinkId(drinkId) {
    const results = await this.findWhere('drink_id', '==', drinkId);
    return results[0] || null;
  }
}

module.exports = EnergyDetailDAO;
