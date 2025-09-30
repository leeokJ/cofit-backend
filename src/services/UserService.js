const UserDAO = require('../dao/UserDAO');
const User    = require('../models/User');
const bcrypt  = require('bcryptjs');

class UserService {
  constructor() {
    this.userDAO = new UserDAO();
  }

  async createUser(data) {
    const user = new User(data);
    const { isValid, errors } = user.validate();
    if (!isValid) throw new Error(errors.join(', '));

    if (await this.userDAO.findByEmail(user.email)) {
      throw new Error('이미 존재하는 이메일입니다.');
    }

    user.password = await bcrypt.hash(user.password, 10);
    return this.userDAO.create(user.toFirestoreData());
  }

  getAllUsers() {
    return this.userDAO.findAll();
  }

  async getUserById(id) {
    const u = await this.userDAO.findById(id);
    if (!u) throw new Error('사용자를 찾을 수 없습니다.');
    return u;
  }

  updateUser(id, data) {
    data.updated_at = new Date();
    return this.userDAO.update(id, data);
  }

  deleteUser(id) {
    return this.userDAO.delete(id);
  }
}

module.exports = UserService;
