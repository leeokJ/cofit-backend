const BaseDAO = require('./BaseDAO');

class IntakeDAO extends BaseDAO {
  constructor() {
    super('intakes');
  }

  async findByDrinkId(drinkId) {
    return this.findWhere('drinkId', '==', drinkId);
  }

  async findByUserId(userId) {
    return this.findWhere('userId', '==', userId);
  }

  async findByDateRange(userId, startDate, endDate) {
    const snapshot = await this.collection
      .where('userId', '==', userId)
      .where('timestamp', '>=', startDate)
      .where('timestamp', '<=', endDate)
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = IntakeDAO;
