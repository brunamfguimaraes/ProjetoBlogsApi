class ErrorMessage {
  constructor() {
    this.message = {
      INVALID_DISPLAY_NAME: 
      `"displayName" length must be at least ${this.DISPLAY_NAME_MIN_CHARACTERS} characters long`,
      INVALID_EMAIL: '"email" must be a valid email',
      INVALID_PASSWORD: `"password" length must be ${this.PASSWORD_MIN_CHARACTERS} characters long`,
      REQUIRED_EMAIL: '"email" is required',
      USER_CONFLICT: 'User already registered',
    };
  }
}

module.exports = new ErrorMessage();