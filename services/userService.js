const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const LENGTH_DISPLAYNAME = '"displayName" length must be at least 8 characters long';
const LENGTH_PASSWORD = '"password" length must be 6 characters long';
const EMAIL_REQUIRED = '"email" is required';
const PASSWORD_REQUIRED = '"password" is required';
const USER_ALREADY_EXISTS = 'User already registered';
const EMAIL_NOT_VALID = '"email" must be a valid email';
const erroMessage = (code, message) => ({ code, message });

const valueLength = (value, min) => (value.length < min);
const valueBlank = (value) => (!value || value === null || value === '');

const validValue = (email, password) => {
  if (valueBlank(email)) { return erroMessage(400, EMAIL_REQUIRED); }
  if (valueBlank(password)) { return erroMessage(400, PASSWORD_REQUIRED); }
  console.log('nao entrou no if password', password);
  return false;
};

const validLength = (displayName, password) => {
  if (valueLength(displayName, 8)) { return erroMessage(400, LENGTH_DISPLAYNAME); }
  if (valueLength(password, 6)) { return erroMessage(400, LENGTH_PASSWORD); }
  return false;
};

const validEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  if (re.test(email)) { return false; }
  return erroMessage(400, EMAIL_NOT_VALID);
};

const emailAlreadyExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) { return erroMessage(409, USER_ALREADY_EXISTS); }
  return false;
};

const validateUser = async ({ displayName, password, email }) => {
  console.log('password', password);
  
  if (validValue(email, password)) { return validValue(email, password); }
  if (validLength(displayName, password)) { return validLength(displayName, password); }
  if (validEmail(email)) { return validEmail(email); }
  if (await emailAlreadyExists(email)) { return emailAlreadyExists(email); }
};

const createToken = (user) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ ...user }, process.env.JWT_SECRET, jwtConfig);
  
  return token;
};

const createUser = async (user) => {
  await User.create({ ...user });
  return createToken(user);
};

module.exports = {
  createUser,
  validateUser,
};