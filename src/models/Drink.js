class Drink {
  constructor({
    name,
    drink_type,
    caffeine_per_serving_mg,
    serving_size_ml,
    image_url,
    notes,
    created_at,
    updated_at
  }) {
    this.name                      = name;                        // string, NOT NULL
    this.drink_type                = drink_type;                  // string ('Coffee'|'Energy'|'Custom'|'Manual'), NOT NULL
    this.caffeine_per_serving_mg   = caffeine_per_serving_mg;     // number, NOT NULL
    this.serving_size_ml           = serving_size_ml;             // number, nullable
    this.image_url                 = image_url;                   // string, nullable
    this.notes                     = notes;                       // string, nullable
    this.created_at                = created_at || new Date();    // timestamp
    this.updated_at                = updated_at || new Date();    // timestamp
  }

  validate() {
    const errors = [];
    if (!this.name) errors.push('name이 필요합니다.');
    if (!['Coffee','Energy','Custom','Manual'].includes(this.drink_type)) {
      errors.push('drink_type이 유효하지 않습니다.');
    }
    if (this.caffeine_per_serving_mg == null) {
      errors.push('caffeine_per_serving_mg가 필요합니다.');
    }
    return { isValid: errors.length===0, errors };
  }

  toFirestoreData() {
    return {
      name: this.name,
      drink_type: this.drink_type,
      caffeine_per_serving_mg: this.caffeine_per_serving_mg,
      serving_size_ml: this.serving_size_ml,
      image_url: this.image_url,
      notes: this.notes,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

module.exports = Drink;
