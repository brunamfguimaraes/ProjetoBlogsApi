const jwt = require('jsonwebtoken');
const { CONFLICT, BAD_REQUEST, NOT_FOUND } = require('http-status');
const { User } = require('../models');
const ERROR_MESSAGE = require('./error');

require('dotenv').config();

const getToken = (id, email) => {
  const payload = { id, email };
  const token = jwt.sign({ data: payload }, process.env.JWT_SECRET, {
    expiresIn: '15m',
    algorithm: 'HS256',
  });
  return token;
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
  if (email === '') return { err: { status: BAD_REQUEST, message: ERROR_MESSAGE.emailEmpty } };
  if (!email) return { err: { status: BAD_REQUEST, message: ERROR_MESSAGE.emailNull } };
  if (!regex.test(email)) {
    return { err: { status: BAD_REQUEST, message: ERROR_MESSAGE.emailInvalid } };
  }
  return true;
};

const validatePassword = (password) => {
  if (password === '') {
    return { err: { status: BAD_REQUEST, message: ERROR_MESSAGE.passwordEmpty } };
  }
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
  const token = getToken(id, email);
  return token;
};

const getUser = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (user === null) {
    return {
      err: {
        status: BAD_REQUEST,
        message: ERROR_MESSAGE.invalidFields,
      },
    };
  }
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({ 
    attributes: { exclude: ['password'] } });
  return users;
};

const getOne = async ({ id }) => {
  const user = await User.findByPk(id, { 
    attributes: { exclude: ['password'] } });
  if (user === null) { 
    return {
      err: {
        status: NOT_FOUND,
        message: ERROR_MESSAGE.noUser,
      },
    };
  }
  return user;
};

const login = async ({ email, password }) => {
  if (validateEmail(email).err) return validateEmail(email);
  if (validatePassword(password).err) return validatePassword(password);
  const userIsValid = await getUser(email, password);
  if (userIsValid.err) return userIsValid;
  const token = getToken(userIsValid.id, email);
  return token;
};

module.exports = {
  create,
  getToken,
  login,
  getAllUsers,
  getOne,
};