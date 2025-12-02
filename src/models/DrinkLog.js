class DrinkLog {
  constructor({
    user_id,
    drink_id,
    intake_time,
    caffeine_mg,
    notes,
    created_at,
    updated_at
  }) {
    this.user_id     = user_id;                       // string (Firestore 문서 ID)
    this.drink_id    = drink_id;                      // string (Firestore 문서 ID)
    this.intake_time = intake_time;                   // timestamp, NOT NULL
    this.caffeine_mg = caffeine_mg;                   // number, NOT NULL
    this.notes       = notes;                         // string, nullable
    this.created_at  = created_at || new Date();      // timestamp
    this.updated_at  = updated_at || new Date();      // timestamp
  }

  validate() {
    const errors = [];
    if (!this.user_id) errors.push('user_id가 필요합니다.');
    if (!this.drink_id) errors.push('drink_id가 필요합니다.');
    if (!this.intake_time) errors.push('intake_time이 필요합니다.');
    if (this.caffeine_mg == null) errors.push('caffeine_mg가 필요합니다.');
    return { isValid: errors.length === 0, errors };
  }

  toFirestoreData() {
    return {
      user_id: this.user_id,
      drink_id: this.drink_id,
      intake_time: this.intake_time,
      caffeine_mg: this.caffeine_mg,
      notes: this.notes,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

module.exports = DrinkLog;
