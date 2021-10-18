const jwt = require('jsonwebtoken');
const { CONFLICT, BAD_REQUEST } = require('http-status');
const { User } = require('../models');

require('dotenv').config();

const ERROR_MESSAGE = { 
  invalidEmail: 'User already registered',
  invalidName: '"displayName" length must be at least 8 characters long',
  emailNull: '"email" is required',
  emailInvalid: '"email" must be a valid email',
  passwordNull: '"password" is required',
  passwordSize: '"password" length must be 6 characters long',
};

const checkEmail = async (email) => {
  const emailIsValid = await User.findOne({ where: { email } });
  if (emailIsValid !== null) {
    return {
      err: {
        status: CONFLICT,
        message: ERROR_MESSAGE.invalidEmail,
      },
    };
  }
  return false;
};

const validateName = (name) => {
  if (!name || typeof (name) !== 'string' || name.length < 8) {
    return {
      err: {
        status: BAD_REQUEST,
        message: ERROR_MESSAGE.invalidName,
      },
    };
  }
  return true;
};

const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  if (!email) return { err: { status: BAD_REQUEST, message: ERROR_MESSAGE.emailNull } };
  if (!regex.test(email)) {
    return { err: { status: BAD_REQUEST, message: ERROR_MESSAGE.emailInvalid } };
  }
  return true;
};

const validatePassword = (password) => {
  if (!password) return { err: { status: BAD_REQUEST, message: ERROR_MESSAGE.passwordNull } };
  if (password.length !== 6) {
    return { err: { status: BAD_REQUEST, message: ERROR_MESSAGE.passwordSize } };
  }
  return true;
};

const create = async ({ displayName, email, password, image }) => {
  if (validateName(displayName).err) return validateName(displayName);
  if (validateEmail(email).err) return validateEmail(email);
  if (validatePassword(password).err) return validatePassword(password);
  const emailExists = await checkEmail(email);
  if (emailExists.err) return emailExists;

  const { id } = await User.create({ displayName, email, password, image });

  const payload = { id, displayName, email };
  const token = jwt.sign({ data: payload }, process.env.JWT_SECRET, {
    expiresIn: '15m',
    algorithm: 'HS256',
  });
  return token;
};

module.exports = {
  create,
};