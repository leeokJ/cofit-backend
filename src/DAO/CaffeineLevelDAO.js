const BaseDAO = require('./BaseDAO');

class CaffeineLevelDAO extends BaseDAO {
  constructor() {
    super('caffeine_levels');
  }

  // 사용자별 전체 조회
  async findByUserId(userId) {
    return this.findWhere('user_id', '==', userId);
  }
}

module.exports = CaffeineLevelDAO;
