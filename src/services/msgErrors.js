  const ERROR_INVALID_FIELDS = { status: 400, message: 'Invalid fields' };
  const ERROR_USER_EXISTS = { status: 409, message: 'User already registered' };
  const ERROR_USER_NOT_EXISTS = { status: 404, message: 'User does not exist' };
  const ERROR_MISSING_TOKEN = { status: 401, message: 'Token not found' };
  const ERROR_EXPIRES_TOKEN = { status: 401, message: 'Expired or invalid token' };
  const ERROR_CATEGORY_NOT_FOUND = { status: 400, message: '"categoryIds" not found' };
  const ERROR_POST_NOT_FOUND = { status: 404, message: 'Post does not exist' };
  const ERROR_UNAUTHORIZED_USER = { status: 401, message: 'Unauthorized user' };

module.exports = {
  ERROR_INVALID_FIELDS,
  ERROR_USER_EXISTS,
  ERROR_USER_NOT_EXISTS,
  ERROR_MISSING_TOKEN,
  ERROR_EXPIRES_TOKEN,
  ERROR_CATEGORY_NOT_FOUND,
  ERROR_POST_NOT_FOUND,
  ERROR_UNAUTHORIZED_USER,
};
