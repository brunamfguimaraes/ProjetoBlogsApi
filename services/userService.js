const { User } = require('../models');

const validDisplayName = (displayName) => {
  if (displayName.length < 8 || typeof displayName !== 'string') {
    return false;
  }
  return true;
};

const validEmail = (email) => {
  if (!email) {
    return false;
  }
  return true;
};
const validFormatEmail = (email) => {
  const regexEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
  if (!regexEmail.test(email)) {
    return false;
  }
  return true;
};

const validPasswordIsRequire = (password) => {
  if (!password) {
    return false;
  }
  return true;
};

const validPassWord = (password) => {
  if (password.length < 6) {
    return false;
  }
  return true;
};

const validationsOne = (displayName, email) => {
  if (!validEmail(email)) return { code: 400, message: '"email" is required' };
  if (!validDisplayName(displayName)) {
    return { code: 400, message: '"displayName" length must be at least 8 characters long' };
  }
  
  if (!validFormatEmail(email)) return { code: 400, message: '"email" must be a valid email' };
  return true;
};

const validationsPassword = (password) => {
  if (!validPasswordIsRequire(password)) {
    return { code: 400, message: '"password" is required' };
  }
  if (!validPassWord(password)) {
    return { code: 400, message: '"password" length must be 6 characters long' };
  }
  return true;
};

const validateCreate = async ({ displayName, email, password, image }) => {
  const validNameEmail = validationsOne(displayName, email);
  const validPassword = validationsPassword(password);
  if (validNameEmail.message) {
    return { code: validNameEmail.code, message: validNameEmail.message };
  }
  if (validPassword.message) {
    return { code: validPassword.code, message: validPassword.message };
  }
  const validEmailExist = await User.findOne({ where: { email } });
  if (validEmailExist) {
    return { code: 409, message: 'User already registered' };
  }
  const userCreate = await User.create({ displayName, email, password, image });
  return userCreate;
};

const validateFindUser = async () => {
  const findUser = await User.findAll();
  return findUser;
};

const validateFindById = async (id) => {
  const findUserById = await User.findByPk(id);
  if (!findUserById) {
    return { code: 404, message: 'User does not exist' };
  }
  return findUserById;
};

module.exports = {
  validateCreate,
  validateFindUser,
  validateFindById,
};