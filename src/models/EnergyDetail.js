class EnergyDetail {
  constructor({
    drink_id,
    calories,
    carbohydrates,
    protein,
    fat,
    sugar,
    sodium,
    created_at,
    updated_at
  }) {
    this.drink_id      = drink_id;                        // string (Firestore 문서 ID)
    this.calories      = calories;                        // number, NOT NULL
    this.carbohydrates = carbohydrates;                   // number, nullable
    this.protein       = protein;                         // number, nullable
    this.fat           = fat;                             // number, nullable
    this.sugar         = sugar;                           // number, nullable
    this.sodium        = sodium;                          // number, nullable
    this.created_at    = created_at || new Date();        // timestamp
    this.updated_at    = updated_at || new Date();        // timestamp
  }

  validate() {
    const errors = [];
    if (!this.drink_id)    errors.push('drink_id가 필요합니다.');
    if (this.calories == null) errors.push('calories가 필요합니다.');
    return { isValid: errors.length === 0, errors };
  }

  toFirestoreData() {
    return {
      calories:      this.calories,
      carbohydrates: this.carbohydrates,
      protein:       this.protein,
      fat:           this.fat,
      sugar:         this.sugar,
      sodium:        this.sodium,
      created_at:    this.created_at,
      updated_at:    this.updated_at
    };
  }
}

module.exports = EnergyDetail;
