const IntakeDAO = require('../DAO/IntakeDAO');
const Intake = require('../models/Intake');

class IntakeService {
  constructor() {
    this.dao = new IntakeDAO();
  }

  async createIntake(data) {
    console.log('Service에서 받은 데이터:', data);
    
    const intake = new Intake(data);
    const { isValid, errors } = intake.validate();
    console.log('검증 결과:', isValid, errors);
    
    if (!isValid) throw new Error(errors.join(', '));

    intake.created_at = new Date();
    intake.updated_at = new Date();

    const firestoreData = intake.toFirestoreData();
    console.log('Firestore 데이터:', firestoreData);
    
    if (data.userId) {
      firestoreData.userId = data.userId;
    }
    
    const result = await this.dao.create(firestoreData);
    console.log('DAO 반환 결과:', result);
    
    return result;
  }

  async getAllIntakes(userId) {
    return this.dao.findAll(userId);
  }

  async getIntakeById(id) {
    const doc = await this.dao.findById(id);
    if (!doc) throw new Error('Intake not found');
    return doc;
  }

  async updateIntake(id, updates) {
    updates.updated_at = new Date();
    return this.dao.update(id, updates);
  }

  async deleteIntake(id) {
    return this.dao.delete(id);
  }

  async getIntakesByDrinkId(drinkId) {
    return this.dao.findByDrinkId(drinkId);
  }

  async getIntakesByDateRange(userId, startDate, endDate) {
    return this.dao.findByDateRange(userId, startDate, endDate);
  }
}

module.exports = IntakeService;
