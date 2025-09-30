class User {
  constructor({ email, password, reset_required, created_at, updated_at }) {
    this.email          = email;
    this.password       = password;
    this.reset_required = reset_required ?? false;
    this.created_at     = created_at  || new Date();
    this.updated_at     = updated_at  || new Date();
  }

  validate() {
    const errors = [];
    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push('유효한 이메일을 입력해주세요.');
    }
    if (!this.password || this.password.length < 6) {
      errors.push('비밀번호는 6자 이상이어야 합니다.');
    }
    return { isValid: errors.length === 0, errors };
  }

  toFirestoreData() {
    return {
      email:          this.email,
      password:       this.password,
      reset_required: this.reset_required,
      created_at:     this.created_at,
      updated_at:     this.updated_at
    };
  }
}

module.exports = User;
