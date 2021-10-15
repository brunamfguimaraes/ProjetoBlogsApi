const { user } = require('../models');

const validateName = (name) => {
  if (typeof (name) === 'string' && name.length > 7) {
    return true;
  }
  return { 
    status: 400, 
    message: '"displayName" length must be at least 8 characters long' };
};

const validatePass = (pass) => {
  if (pass && pass.length === 6) {
    return true;
  }
  return { status: 400, message: '"password" length must be 6 characters long' };
};

const validateEmail = (email) => {
  if (!(/^([\w\- ]+\.)*[\w\- ]+@([\w\- ]+\.)+([\w\- ]{2,3})$/.test(email))) {
    return { status: 400, messsage: '"email" must be a valid email' };
  }
  if (!email) {
    return { status: 400, message: '"email" is required' };
  }
  return true;
};

const isValid = (name, email, pass) => {
  const isValidName = validateName(name);
  const isValidEmail = validateEmail(email);
  const isValidPass = validatePass(pass);
  let err;
  [isValidName, isValidEmail, isValidPass].forEach((oneValid) => {
    if (oneValid.message) {
      err = oneValid;
      return err;
    }
      err = true;
      return err;
  });
  return err;
};

const createUser = async (displayName, email, password) => {
  const validate = isValid(displayName, email, password);
  if (validate.message) {
    return validate;
  }
  const UserExist = await user.findOne(email);
  if (UserExist.length < 1) {
    return { status: 409, message: 'User already registered' };
  }
  return true;
};

module.exports = { 
  createUser,
 };