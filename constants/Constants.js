const ErrorMessages = require('./ErrorMessages');
const StatusCode = require('./StatusCode');

class Constants {
  constructor(statusCode, errorMessage) {
    this.DISPLAY_NAME_MIN_CHARACTERS = 8;
    this.PASSWORD_MIN_CHARACTERS = 6;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
  }
}

module.exports = new Constants(StatusCode.codes, ErrorMessages.message);