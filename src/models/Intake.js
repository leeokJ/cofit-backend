class Intake {
  constructor({
    drinkId,
    quantity_ml,
    timestamp,
    notes,
    caffeine_mg,
    created_at,
    updated_at
  }) {
    this.drinkId = drinkId;
    this.quantity_ml = quantity_ml;
    this.timestamp = timestamp;
    this.notes = notes;
    this.caffeine_mg = caffeine_mg;
    this.created_at = created_at || new Date();
    this.updated_at = updated_at || new Date();
  }

  validate() {
    const errors = [];
    
    if (!this.drinkId) {
      errors.push('drinkId가 필요합니다.');
    }
    
    if (this.quantity_ml == null || this.quantity_ml <= 0) {
      errors.push('quantity_ml은 필수이며 0보다 커야 합니다.');
    }
    
    if (!this.timestamp) {
      errors.push('timestamp가 필요합니다.');
    }
    
    return { isValid: errors.length === 0, errors };
  }

  toFirestoreData() {
    const data = {
      drinkId: this.drinkId,
      quantity_ml: this.quantity_ml,
      timestamp: this.timestamp,
      created_at: this.created_at,
      updated_at: this.updated_at
    };

    if (this.notes) data.notes = this.notes;
    if (this.caffeine_mg != null) data.caffeine_mg = this.caffeine_mg;

    return data;
  }
}

module.exports = Intake;
