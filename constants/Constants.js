class Constants {
  constructor() {
    this.DISPLAY_NAME_MIN_CHARACTERS = 8;
    this.PASSWORD_MIN_CHARACTERS = 6;

    this.statusCode = {
      OK: '200',
      CREATED: '201',
      BAD_REQUEST: '400',
      FORBIDDEN: '403',
      NOT_FOUND: '404',
      CONFLICT: '409',
    };

    this.errorMessage = {
      INVALID_DISPLAY_NAME: 
      `"displayName" length must be at least ${this.DISPLAY_NAME_MIN_CHARACTERS} characters long`,
      INVALID_EMAIL: '"email" must be a valid email',
      INVALID_PASSWORD: `"password" length must be ${this.PASSWORD_MIN_CHARACTERS} characters long`,
      REQUIRED_EMAIL: '"email" is required',
      USER_CONFLICT: 'User already registered',
    };
  }
}

module.exports = new Constants();