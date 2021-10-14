const { User } = require('../models');

const emptyFields = (field) => {
  if (field) {
  const err = { name: 'emptyError',
  message: `"${field}" is required` };
  throw err;
  }
  return false;
};

const blankFields = (field) => {
  if (field) {
    const err = { name: 'blankError',
    message: `"${field}" is not allowed to be empty` };
    throw err;
    }
    return false;
};

const userLogin = async (email, password) => {
  const registeredUser = await User.findOne({ where: { email, password } });
  if (!registeredUser) {
    const err = { name: 'notRegistered',
    message: 'Invalid fields' };
    throw err;
  }
  return true;
};

module.exports = {
  userLogin,
  emptyFields,
  blankFields,
};
