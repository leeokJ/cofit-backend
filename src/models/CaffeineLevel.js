class CaffeineLevel {
  constructor({ user_id, timestamp, bcc_mg_per_l, created_at, updated_at }) {
    this.user_id     = user_id;                 // string (Firestore 문서 ID)
    this.timestamp   = timestamp;               // timestamp, NOT NULL
    this.bcc_mg_per_l= bcc_mg_per_l;            // number, NOT NULL
    this.created_at  = created_at || new Date();// timestamp
    this.updated_at  = updated_at || new Date();// timestamp
  }

  validate() {
    const errors = [];
    if (!this.user_id) errors.push('user_id 필요');
    if (!this.timestamp) errors.push('timestamp 필요');
    if (this.bcc_mg_per_l == null) errors.push('bcc_mg_per_l 필요');
    return { isValid: errors.length === 0, errors };
  }

  toFirestoreData() {
    return {
      user_id: this.user_id,
      timestamp: this.timestamp,
      bcc_mg_per_l: this.bcc_mg_per_l,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

module.exports = CaffeineLevel;
