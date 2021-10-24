const { User } = require('../models');

const validateEmailPassword = (email, password) => {
  if (!email) {
    return { code: 400, message: '"email" is required' };
  }
  if (!password) {
    return { code: 400, message: '"password" is required' };
  }
  return true;
};

const validateEmptyEmailPassword = (email, password) => {
  if (email === '') {
    return { code: 400, message: '"email" is not allowed to be empty' };
  }
  if (password === '') {
    return { code: 400, message: '"password" is not allowed to be empty' };
  }
  return true;
};

const validateLogin = async ({ email, password }) => {
  const validEmpty = validateEmptyEmailPassword(email, password);
  if (validEmpty !== true) {
    return { code: validEmpty.code, message: validEmpty.message };
  }
  const validEmailPassword = validateEmailPassword(email, password);
  if (validEmailPassword !== true) {
    return { code: validEmailPassword.code, message: validEmailPassword.message };
  }
  const existingEmail = await User.findOne({ where: { email, password } });
  if (!existingEmail) {
    return { code: 400, message: 'Invalid fields' };
  }
  const userLogin = await User.findOne({ where: { email, password } });
  return userLogin;
};

module.exports = {
  validateLogin,
};