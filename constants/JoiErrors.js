const ErrorMessages = require('./ErrorMessages');

class JoiErrors {
  constructor(errorMessages) {
    this.msg = errorMessages;
    this.error = {};

    this.required = this.required.bind(this);
    this.min = this.min.bind(this);
    this.regex = this.regex.bind(this);
    this.empty = this.empty.bind(this);
    this.init = this.init.bind(this);
    this.init(errorMessages);
  }

  required() {
    this.error = { ...this.error,
      'any.required': {
      password: this.msg.REQUIRED_PASSWORD,
      displayName: this.msg.REQUIRED_DISPLAY_NAME,
      email: this.msg.REQUIRED_EMAIL,
      name: this.msg.REQUIRED_CATEGORY_NAME,
     }, 
    };
  }

  min() {
    this.error = { ...this.error,
      'string.min': {
        password: this.msg.INVALID_PASSWORD,
        displayName: this.msg.INVALID_DISPLAY_NAME,
      },
    };
  }

  regex() {
    this.error = { ...this.error,
      'string.regex.base': {
        email: this.msg.INVALID_EMAIL,
      },
    };
  }

  empty() {
    this.error = { ...this.error,
      'any.empty': {
        password: this.msg.EMPTY_PASSWORD,
        email: this.msg.EMPTY_EMAIL,
        name: this.msg.EMPTY_CATEGORY_NAME,
      },
    };
  }

  init() {
    this.required();
    this.min();
    this.regex();
    this.empty();
  }
}

module.exports = new JoiErrors(ErrorMessages.message);