const ERROR_MESSAGE = {
  invalidEmail: 'User already registered',
  invalidName: '"displayName" length must be at least 8 characters long',
  emailNull: '"email" is required',
  emailInvalid: '"email" must be a valid email',
  passwordNull: '"password" is required',
  passwordSize: '"password" length must be 6 characters long',
  emailEmpty: '"email" is not allowed to be empty',
  passwordEmpty: '"password" is not allowed to be empty',
  invalidFields: 'Invalid fields',
  serverError: 'Internal server error',
};

module.exports = ERROR_MESSAGE;