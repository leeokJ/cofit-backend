class Notification {
  constructor({
    user_id,
    notify_time,
    type,
    status,
    payload,
    created_at,
    updated_at
  }) {
    this.user_id    = user_id;                           // string
    this.notify_time= notify_time;                       // timestamp
    this.type       = type;                              // string ('Intake'|'Reminder')
    this.status     = status;                            // string ('Pending'|'Sent'|'Cancelled')
    this.payload    = payload;                           // object|null
    this.created_at = created_at || new Date();          // timestamp
    this.updated_at = updated_at || new Date();          // timestamp
  }

  validate() {
    const errors = [];
    if (!this.user_id)       errors.push('user_id 필요');
    if (!this.notify_time)   errors.push('notify_time 필요');
    if (!['Intake','Reminder'].includes(this.type)) {
      errors.push('type 유효하지 않음');
    }
    if (!['Pending','Sent','Cancelled'].includes(this.status)) {
      errors.push('status 유효하지 않음');
    }
    return { isValid: errors.length===0, errors };
  }

  toFirestoreData() {
    return {
      user_id: this.user_id,
      notify_time: this.notify_time,
      type: this.type,
      status: this.status,
      payload: this.payload,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

module.exports = Notification;
