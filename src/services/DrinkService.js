const DrinkDAO = require('../dao/DrinkDAO');
const Drink    = require('../models/Drink');

class DrinkService {
  constructor() {
    this.dao = new DrinkDAO();
  }

  async createDrink(data) {
    const drink = new Drink(data);
    const { isValid, errors } = drink.validate();
    if (!isValid) throw new Error(errors.join(', '));

    drink.created_at = new Date();
    drink.updated_at = new Date();
    return this.dao.create(drink.toFirestoreData());
  }

  async getAllDrinks() {
    return this.dao.findAll();
  }

  async getDrinkById(id) {
    const doc = await this.dao.findById(id);
    if (!doc) throw new Error('Drink not found');
    return doc;
  }

  async updateDrink(id, updates) {
    updates.updated_at = new Date();
    return this.dao.update(id, updates);
  }

  async deleteDrink(id) {
    return this.dao.delete(id);
  }

  async getDrinksByType(type) {
    return this.dao.findByType(type);
  }
}

module.exports = DrinkService;
