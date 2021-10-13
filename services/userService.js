const { User } = require('../models');

const verifyEmptyFields = (field) => {
  if (field) {
    const err = { name: 'emptyError',
    message: `'${field}' is required` };
    throw err;
  }
  return false;
};

const validateNameAndPassword = (field, count, length) => {
  if (count < length) {
    const err = { name: 'lengthError',
    message: `'${field}' lenght must be at least ${length} characters long` };
    throw err;
  }
  return false;
};

const fieldLength = (v1, v2) => {
  const DISPLAY_LENGTH = 8;
  const PASSWORD_LENGTH = 6;
  const count1 = v1.length;
  const count2 = v2.length;
  if (v1.length < DISPLAY_LENGTH) {
    validateNameAndPassword('displayName', count1, DISPLAY_LENGTH);
  } if (v2.length < PASSWORD_LENGTH) {
    validateNameAndPassword('password', count2, PASSWORD_LENGTH);
  }
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validation = re.test(email);
  if (!validation) {
    const err = { name: 'emailError',
    message: '\'email\' must be a valid email' };
    throw err;
  }
};

const createNewUser = async (displayName, email, password, image) => {
    const created = await User.create({ displayName, email, password, image });
    const response = { status: 'created', message: created };
    return response;
};

module.exports = {
  createNewUser,
  fieldLength,
  validateEmail,
  verifyEmptyFields,
};
