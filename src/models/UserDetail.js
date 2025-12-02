class UserDetail {
  constructor({
    user_id,
    nickname,
    birth_date,
    gender,
    weight,
    smoker,
    pregnant,
    medication,
    liver_disease,
    caffeine_goal,
    push_opt_in,
    data_share_opt_in,
    created_at,
    updated_at
  }) {
    this.user_id          = user_id;                       // string (Firestore 문서 ID)
    this.nickname         = nickname;                      // string
    this.birth_date       = birth_date;                    // timestamp
    this.gender           = gender;                        // string ('M'|'F')
    this.weight           = weight;                        // number (kg)
    this.smoker           = smoker;                        // boolean
    this.pregnant         = pregnant;                      // boolean
    this.medication       = medication;                    // boolean
    this.liver_disease    = liver_disease;                 // boolean
    this.caffeine_goal    = caffeine_goal;                 // number (mg)
    this.push_opt_in      = push_opt_in;                   // boolean
    this.data_share_opt_in= data_share_opt_in;             // boolean
    this.created_at       = created_at  || new Date();     // timestamp
    this.updated_at       = updated_at  || new Date();     // timestamp
  }

  validate() {
    const errors = [];
    if (!this.user_id) errors.push('user_id가 필요합니다.');
    if (this.gender && !['M','F'].includes(this.gender))
      errors.push('gender는 M 또는 F여야 합니다.');
    return { isValid: errors.length === 0, errors };
  }

  toFirestoreData() {
    return {
      user_id: this.user_id,
      nickname: this.nickname,
      birth_date: this.birth_date,
      gender: this.gender,
      weight: this.weight,
      smoker: this.smoker,
      pregnant: this.pregnant,
      medication: this.medication,
      liver_disease: this.liver_disease,
      caffeine_goal: this.caffeine_goal,
      push_opt_in: this.push_opt_in,
      data_share_opt_in: this.data_share_opt_in,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

module.exports = UserDetail;
