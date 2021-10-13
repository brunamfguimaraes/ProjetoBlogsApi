const { User } = require('../models');

const fieldLength = (field, count, length) => {
    console.log(count, length);
  if (count < length) {
    const err = { name: 'displayError',
    message: `'${field}' lenght must be at least ${length} characters long` };
    throw err;
  }
  return false;
};

const validateFields = (v1, v2, l1, l2) => {
  const count1 = v1.length;
  const count2 = v2.length;
  if (v1.length < l1) fieldLength('displayName', count1, l1);
  if (v2.length < l2) fieldLength('password', count2, l2);
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
    validateFields(displayName, password);
    validateEmail(email);
    const created = await User.create({ displayName, email, password, image });
    const response = { status: 'created', message: created };
    return response;
};

module.exports = {
  createNewUser,
  validateFields,
  validateEmail,
};
