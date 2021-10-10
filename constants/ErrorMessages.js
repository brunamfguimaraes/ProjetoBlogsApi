const MinimumCharacters = require('./MinimumCharacters');

class ErrorMessage {
  constructor(minChar) {
    this.DISPLAY_NAME_MIN_CHARACTERS = minChar.displayName;
    this.PASSWORD_MIN_CHARACTERS = minChar.password;
    this.message = {
      INVALID_DISPLAY_NAME: 
      `"displayName" length must be at least ${this.DISPLAY_NAME_MIN_CHARACTERS} characters long`,
      INVALID_EMAIL: '"email" must be a valid email',
      INVALID_PASSWORD: `"password" length must be ${this.PASSWORD_MIN_CHARACTERS} characters long`,
      REQUIRED_EMAIL: '"email" is required',
      REQUIRED_PASSWORD: '"password" is required',
      REQUIRED_DISPLAY_NAME: '"displayName" is required',
      USER_CONFLICT: 'User already registered',
    };
  }
}

module.exports = new ErrorMessage(MinimumCharacters.minChar);