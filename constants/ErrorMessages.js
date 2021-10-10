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
      INVALID_FIELDS: 'Invalid fields',
      INVALID_TOKEN: 'Expired or invalid token',
      EMPTY_PASSWORD: '"password" is not allowed to be empty',
      EMPTY_EMAIL: '"email" is not allowed to be empty',
      EMPTY_TOKEN: 'Token not found',
      REQUIRED_EMAIL: '"email" is required',
      REQUIRED_PASSWORD: '"password" is required',
      REQUIRED_DISPLAY_NAME: '"displayName" is required',
      USER_CONFLICT: 'User already registered',
      USER_NOT_FOUND: 'User does not exist',
    };
  }
}

module.exports = new ErrorMessage(MinimumCharacters.minChar);