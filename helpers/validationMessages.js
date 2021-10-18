const ERROR = { message: 'Ops, an error occured with your request!' };

const UNAUTHORIZED_USER = { message: 'Unauthorized user' };

const USER_DOES_NOT_EXIST = { message: 'User does not exist' };

const POST_DOES_NOT_EXIST = { message: 'Post does not exist' };

const ALREADY_EXISTS = { message: 'User already registered' };

const FIELDS_NOT_EXISTS = { message: 'Invalid fields' };

const TOKEN_NOT_FOUND = { message: 'Token not found' };

const CATEGORY_IDS_NOT_FOUND = { message: '"categoryIds" not found' };

const INVALID_TOKEN = { message: 'Expired or invalid token' };

const DISPLAY_NAME_LENGTH = { message: '"displayName" length must be at least 8 characters long' };

const PASSWORD_LENGTH = { message: '"password" length must be 6 characters long' };

const EMPTY_EMAIL = { message: '"email" is not allowed to be empty' };

const EMPTY_PASSWORD = { message: '"password" is not allowed to be empty' };

const REQUIRED_PASSWORD = { message: '"password" is required' };

const REQUIRED_NAME = { message: '"name" is required' };

const REQUIRED_EMAIL = { message: '"email" is required' };

const REQUIRED_TITLE = { message: '"title" is required' };

const REQUIRED_CONTENT = { message: '"content" is required' };

const REQUIRED_CATEGORY_ID = { message: '"categoryIds" is required' };

const EDIT_CATEGORIES = { message: 'Categories cannot be edited' };

const VALID_EMAIL = { message: '"email" must be a valid email' };

module.exports = {
  ERROR,
  UNAUTHORIZED_USER,
  USER_DOES_NOT_EXIST,
  POST_DOES_NOT_EXIST,
  ALREADY_EXISTS,
  FIELDS_NOT_EXISTS,
  TOKEN_NOT_FOUND,
  CATEGORY_IDS_NOT_FOUND,
  INVALID_TOKEN,
  DISPLAY_NAME_LENGTH,
  PASSWORD_LENGTH,
  EMPTY_EMAIL,
  EMPTY_PASSWORD,
  REQUIRED_PASSWORD,
  REQUIRED_NAME,
  REQUIRED_EMAIL,
  REQUIRED_TITLE,
  REQUIRED_CONTENT,
  REQUIRED_CATEGORY_ID,
  EDIT_CATEGORIES,
  VALID_EMAIL,
};