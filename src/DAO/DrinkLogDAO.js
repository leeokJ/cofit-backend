const BaseDAO = require('./BaseDAO');

class DrinkLogDAO extends BaseDAO {
  constructor() {
    super('drink_logs');
  }

  async findByUserId(userId) {
    return this.findWhere('user_id', '==', userId);
  }

  // 지난 24시간 섭취 이력 조회
  async getDrinkLogsLast24Hours(userId, baseTime) {
    try {
      const oneDayAgo = new Date(baseTime.getTime() - 24 * 60 * 60 * 1000);

      const snapshot = await this.collection
        .where('user_id', '==', userId)
        .where('intake_time', '>=', oneDayAgo)
        .where('intake_time', '<=', baseTime)
        .orderBy('intake_time', 'asc')
        .get();

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('getDrinkLogsLast24Hours Error:', error);
      throw error;
    }
  }

  // 시간 범위별 섭취 이력 조회
  async getDrinkLogsInRange(userId, startTime, endTime) {
    try {
      const snapshot = await this.collection
        .where('user_id', '==', userId)
        .where('intake_time', '>=', startTime)
        .where('intake_time', '<=', endTime)
        .orderBy('intake_time', 'asc')
        .get();

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('getDrinkLogsInRange Error:', error);
      throw error;
    }
  }  
}

module.exports = DrinkLogDAO;
