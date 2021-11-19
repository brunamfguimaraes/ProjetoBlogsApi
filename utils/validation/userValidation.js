const { User } = require('../../models');
const erroMessage = require('../errosCode/erroMessage');

const err = (statusCode) => ({ statusCode });

const displayNameUser = (displayName) => {
  if (!displayName || displayName.length < 8) throw err(erroMessage.DISPLAY_LEAST_CHARACTER);
};

const emailExist = (email) => {
  if (!email) throw err(erroMessage.EMAIL_NOT_EXIST);
};

const emailNotEmpty = (email) => {
  if (email === '') throw err(erroMessage.EMAIL_EMPTY);
};

const emailIsValid = (email) => {
  const validEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!validEmail) throw err(erroMessage.EMAIL_NOT_VALID);
};

const passwordExist = (password) => {
  if (!password) throw err(erroMessage.PASSWORD_NOT_EXIST);
};

const passwordNotEmpty = (password) => {
  if (password === '') throw err(erroMessage.PASSWORD_EMPTY);
};

const passwordIsValid = (password) => {
  if (password.length !== 6) throw err(erroMessage.PASSWORD_DIFFERENT_LENGTH);
};

const userExist = async (email) => {
  const response = await User.findOne({ where: { email } });
  if (response) throw err(erroMessage.USER_EXIST);
};

const loginInvalid = async (email, password) => {
  const response = await User.findOne({ where: { email, password } });
  if (!response) throw err(erroMessage.LOGIN_INVALID);
  return response;
};

const existById = (data) => {
  if (!data) throw err(erroMessage.USER_NOT_EXIST);
};

module.exports = {
  displayNameUser,
  userExist,
  emailExist,
  emailNotEmpty,
  emailIsValid,
  passwordExist,
  passwordNotEmpty,
  passwordIsValid,
  loginInvalid,
  existById,
};
