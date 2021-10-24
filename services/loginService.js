const { User } = require('../models');

const validateEmailPassword = (email, password) => {
  if (!email) {
    return { code: 400, message: '"email" is required' };
  }
  if (email === '') {
    return { code: 400, message: '"email" is not allowed to be empty' };
  }
  if (!password) {
    return { code: 400, message: '"password" is required' };
  }
  if (password === '') {
    return { code: 400, message: '"password" is not allowed to be empty' };
  }
  return true;
};

const validateExistingEmail = async (email, password) => {
  const existingEmail = await User.findOne({ where: { email, password } });
  if (!existingEmail) {
    return { code: 400, message: 'Invalid fields' };
  }
  return true;
};

const validateLogin = async (email, password) => {
  const validEmailPassword = validateEmailPassword(email, password);
  const validExist = await validateExistingEmail(email, password);
  if (!validEmailPassword) {
    return { code: validEmailPassword.code, message: validEmailPassword.message };
  }
  if (!validExist) {
    return { code: validExist.code, message: validExist.message };
  }
  const userLogin = await User.findOne({ where: { email, password } });
  return userLogin;
};

module.exports = {
  validateLogin,
};