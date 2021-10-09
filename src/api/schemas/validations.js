const { User } = require('../../models');

// const NUM = 0;
const code = 400;
const pattern = /\S+@\S+\.\S+/;

const errors = {
  nameLength: '"displayName" length must be at least 8 characters long',
  password: '"password" length must be 6 characters long',
  emailValid: '"email" must be a valid email',
  emailExists: '"email" is required',
  passwordExists: '"password" is required',
  userExists: 'User already registered',
  loginEamil: '"email" is not allowed to be empty',
  loginPass: '"password" is not allowed to be empty',
};

const nameLength = (value, min) => value.length < min;
const isEmail = (email) => !email;
const isValidEamil = (email) => !email.match(pattern);
const passwordLength = (value, min) => value.length < min;
const isPassword = (password) => !password;
// const isEmailEmpty = (email) => !!email.length;
// const isPasswordEmpty = (password) => !!password.length;
const userExists = async (email) => {
  const user = await User.findAll({ where: { email } });
  return !!user.length;
};

const userValidateEmailAndPassword = (email, password) => {
  const lenPass = 6;

  switch (true) {
  case isEmail(email): return { code, message: errors.emailExists };
  case isValidEamil(email): return { code, message: errors.emailValid };
  case isPassword(password): return { code, message: errors.passwordExists };
  case passwordLength(password, lenPass): return { code, message: errors.password };
  default: return {};
  }
};

const userValidate = async ({ displayName, email, password }) => {
  const lenName = 8;
  const validEmailPass = await userValidateEmailAndPassword(email, password);
  if (Object.keys(validEmailPass).length) return validEmailPass;
  switch (true) {
  case nameLength(displayName, lenName): return { code, message: errors.nameLength };
  case await userExists(email): return { code: 409, message: errors.userExists };
  default: return {};
  }
};

const loginValidate = async ({ email, password }) => {
  if (email === undefined) {
    return { code, message: errors.emailExists };
  }

  if (password === undefined) {
    return { code, message: errors.passwordExists };
  }

  if (!email) {
    return { code, message: errors.loginEamil };
  }

  if (!password) {
    return { code, message: errors.loginPass };
  }
  return {};
};

const tokenValidate = (token) => {
  const patternToken = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
  return token.match(patternToken);
};

module.exports = { userValidate, loginValidate, tokenValidate };
