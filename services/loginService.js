const createToken = require('../middleware/token');
const { User } = require('../models');

const LENGTH_PASSWORD = '"password" length must be 6 characters long';
const EMPTY_PASSWORD = '"password" is not allowed to be empty';
const EMPTY_EMAIL = '"email" is not allowed to be empty';
const EMAIL_REQUIRED = '"email" is required';
const PASSWORD_REQUIRED = '"password" is required';
const USER_NOT_EXISTS = 'Invalid fields';
const erroMessage = (code, message) => ({ code, message });

const valueLength = (value, min) => (value.length < min);
const valueExists = (value) => (!value);
const valueEmpty = (value) => (value === '');

const validValueExists = (email, password) => {
  if (valueEmpty(email)) { return erroMessage(400, EMPTY_EMAIL); }
  if (valueEmpty(password)) { return erroMessage(400, EMPTY_PASSWORD); }
  if (valueExists(email)) { return erroMessage(400, EMAIL_REQUIRED); }
  if (valueExists(password)) { return erroMessage(400, PASSWORD_REQUIRED); }
  return false;
};

const validLength = (password) => {
  if (valueLength(password, 6)) { return erroMessage(400, LENGTH_PASSWORD); }
  return false;
};

const userNotExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return false; 
}
  return true;
};

const validateLogin = async ({ password, email }) => {
  if (validValueExists(email, password)) { return validValueExists(email, password); }
  if (validLength(password)) { return validLength(password); }
  if (await userNotExists(email)) { return erroMessage(400, USER_NOT_EXISTS); }
  return false;
};

const login = async (user) => {
  const result = await validateLogin(user);
  if (result) { return result; }
  return createToken(user.email);
};

module.exports = {
  login,
};