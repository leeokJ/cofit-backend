const BaseDAO = require('./BaseDAO');

class NotificationDAO extends BaseDAO {
  constructor() {
    super('notifications');
  }

  async findByUserId(userId) {
    return this.findWhere('user_id','==',userId);
  }
}

module.exports = NotificationDAO;
