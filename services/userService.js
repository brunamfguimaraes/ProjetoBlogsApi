const { User } = require('../models/index');

const validateName = (name) => {
  if (typeof (name) === 'string' && name.length > 7) {
    return true;
  }
  return { 
    status: 400, 
    message: '"displayName" length must be at least 8 characters long' };
};

const validatePass = (pass, situation) => {
  if (pass === '') {
    return situation;
  }
  if (!pass) {
    return { status: 400, message: '"password" is required' };
  }
  if (pass.length !== 6) {
    return situation;
  }
  return true;
};

const validateEmail = (email, situation) => {
  if (email === '') {
    return situation;
  }
  if (!email) {
    return { status: 400, message: '"email" is required' };
  }
  if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email))) {
    return situation;
  }
  return true;
};

const isValid = (name, email, pass) => {
  const isValidName = validateName(name); 
  const isValidEmail = validateEmail(email, 
    { status: 400, message: '"email" must be a valid email' }); 
  const isValidPass = validatePass(pass, 
    { status: 400, message: '"password" length must be 6 characters long' });
  if (isValidName.message) {
    return isValidName;
  }
  if (isValidEmail.message) {
    return isValidEmail;
  }
  if (isValidPass.message) {
    return isValidPass;
  }
  return true;
};

const createUser = async (displayName, email, password) => {
  const validate = isValid(displayName, email, password);
  if (validate.message) {
    return validate;
  }
  const UserExist = await User.findAll({ where: { email } });
  if (UserExist.length > 0) {
    return { status: 409, message: 'User already registered' };
  }
  return true;
};

const findLogin = (email, password) => {
  const isValidEmail = validateEmail(email, 
    { status: 400, message: '"email" is not allowed to be empty' }); 
  const isValidPass = validatePass(password, 
    { status: 400, message: '"password" is not allowed to be empty' });
  if (isValidEmail.message) {
    return isValidEmail;
  }
  if (isValidPass.message) {
    return isValidPass;
  }
  return true;
};

const findUsers = (token) => {
  if (!token) {
    return { status: 401, message: 'Token not found' };
  }
  if (token.length < 16) {
    return { status: 401, message: 'Expired or invalid token' };
  }
  return true;
};

module.exports = { 
  createUser,
  findLogin,
  findUsers,
 };