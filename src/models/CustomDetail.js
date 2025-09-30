class CustomDetail {
  constructor({
    drink_id,
    user_id,
    extraction_type,
    bean_amount_g,
    bean_type,
    created_at,
    updated_at
  }) {
    this.drink_id       = drink_id;                        // string (Firestore 문서 ID)
    this.user_id        = user_id;                         // string (User 문서 ID)
    this.extraction_type= extraction_type;                 // string ('Espresso' | 'HandDrip')
    this.bean_amount_g  = bean_amount_g;                   // number (g)
    this.bean_type      = bean_type;                       // string ('Arabica' | 'Robusta')
    this.created_at     = created_at || new Date();        // timestamp
    this.updated_at     = updated_at || new Date();        // timestamp
  }

  validate() {
    const errors = [];
    if (!this.drink_id) errors.push('drink_id가 필요합니다.');
    if (!this.user_id) errors.push('user_id가 필요합니다.');
    if (!['Espresso','HandDrip'].includes(this.extraction_type)) {
      errors.push('extraction_type은 Espresso 또는 HandDrip이어야 합니다.');
    }
    if (typeof this.bean_amount_g !== 'number' || this.bean_amount_g <= 0) {
      errors.push('bean_amount_g는 0보다 큰 숫자여야 합니다.');
    }
    if (!['Arabica','Robusta'].includes(this.bean_type)) {
      errors.push('bean_type은 Arabica 또는 Robusta이어야 합니다.');
    }
    return { isValid: errors.length === 0, errors };
  }

  toFirestoreData() {
    return {
      user_id: this.user_id,
      extraction_type: this.extraction_type,
      bean_amount_g: this.bean_amount_g,
      bean_type: this.bean_type,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

module.exports = CustomDetail;
