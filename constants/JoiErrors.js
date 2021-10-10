const ErrorMessages = require('./ErrorMessages');

class JoiErrors {
  constructor(errorMessages) {
    this.error = {
        'any.required': {
          password: errorMessages.REQUIRED_PASSWORD,
          displayName: errorMessages.REQUIRED_DISPLAY_NAME,
          email: errorMessages.REQUIRED_EMAIL,
          name: '"name" is required',
        },
        'string.min': {
          password: errorMessages.INVALID_PASSWORD,
          displayName: errorMessages.INVALID_DISPLAY_NAME,
        },
        'string.regex.base': {
          email: errorMessages.INVALID_EMAIL,
        },
        'any.empty': {
          password: errorMessages.EMPTY_PASSWORD,
          email: errorMessages.EMPTY_EMAIL,
        },
    };
  }
}

module.exports = new JoiErrors(ErrorMessages.message);