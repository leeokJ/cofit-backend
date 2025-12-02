class NotificationSetting {
  constructor({ user_id, bcc_threshold, is_enabled, created_at, updated_at }) {
    this.user_id = user_id;
    this.bcc_threshold = bcc_threshold;
    this.is_enabled = is_enabled !== false;
    this.created_at = created_at || new Date();
    this.updated_at = updated_at || new Date();
  }

  validate() {
    const errors = [];
    if (!this.user_id) errors.push('user_id 필요');
    if (this.bcc_threshold == null) errors.push('bcc_threshold 필요');
    if (this.bcc_threshold < 0) errors.push('bcc_threshold은 0 이상이어야 합니다');
    return { isValid: errors.length === 0, errors };
  }

  toFirestoreData() {
    return {
      user_id: this.user_id,
      bcc_threshold: this.bcc_threshold,
      is_enabled: this.is_enabled,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

module.exports = NotificationSetting;
