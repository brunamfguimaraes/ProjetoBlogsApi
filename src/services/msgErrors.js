  const ERROR_INVALID_FIELDS = { status: 400, message: 'Invalid fields' };
  const ERROR_USER_EXISTS = { status: 409, message: 'User already registered' };
  const ERROR_USER_NOT_EXISTS = { status: 404, message: 'User does not exist' };
  const ERROR_MISSING_TOKEN = { status: 401, message: 'Token not found' };
  const ERROR_EXPIRES_TOKEN = { status: 401, message: 'Expired or invalid token' };

module.exports = {
  ERROR_INVALID_FIELDS,
  ERROR_USER_EXISTS,
  ERROR_USER_NOT_EXISTS,
  ERROR_MISSING_TOKEN,
  ERROR_EXPIRES_TOKEN,
};
