class Drink {
  constructor({ caffeineMg, created_at, updated_at }) {
    this.caffeineMg = caffeineMg; // number, NOT NULL
    this.created_at = created_at || new Date(); // timestamp
    this.updated_at = updated_at || new Date(); // timestamp
  }

  validate() {
    const errors = [];
    if (this.caffeineMg == null) {
      errors.push("caffeineMg이 필요합니다.");
    }
    return { isValid: errors.length === 0, errors };
  }

  toFirestoreData() {
    return {
      caffeineMg: this.caffeineMg,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

module.exports = Drink;
