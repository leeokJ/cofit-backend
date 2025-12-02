class CoffeeDetail {
  constructor({
    drink_id,
    brand,
    brand_logo_url,
    extraction_type,
    bean_type,
    shots,
    created_at,
    updated_at
  }) {
    this.drink_id        = drink_id;                        // string (Firestore 문서 ID)
    this.brand           = brand;                           // string
    this.brand_logo_url  = brand_logo_url;                  // string
    this.extraction_type = extraction_type;                 // string ('Espresso' | 'HandDrip')
    this.bean_type       = bean_type;                       // string ('Arabica' | 'Robusta')
    this.shots           = shots ?? 1;                      // number
    this.created_at      = created_at || new Date();        // timestamp
    this.updated_at      = updated_at || new Date();        // timestamp
  }

  validate() {
    const errors = [];
    if (!this.drink_id) errors.push('drink_id가 필요합니다.');
    if (!this.brand) errors.push('brand가 필요합니다.');
    if (!['Espresso','HandDrip'].includes(this.extraction_type)) {
      errors.push('extraction_type은 Espresso 또는 HandDrip이어야 합니다.');
    }
    if (!['Arabica','Robusta'].includes(this.bean_type)) {
      errors.push('bean_type은 Arabica 또는 Robusta이어야 합니다.');
    }
    if (this.shots <= 0) errors.push('shots는 1 이상이어야 합니다.');
    return { isValid: errors.length===0, errors };
  }

  toFirestoreData() {
    return {
      brand: this.brand,
      brand_logo_url: this.brand_logo_url,
      extraction_type: this.extraction_type,
      bean_type: this.bean_type,
      shots: this.shots,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

module.exports = CoffeeDetail;
