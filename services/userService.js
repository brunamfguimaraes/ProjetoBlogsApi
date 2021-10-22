const { User } = require('../models');

const existsPassword = (password) => {
  if (!password) {
    const objResp = {
      message: '"email" is required',
      status: 400,
    };
    return objResp;
  }
  return false;
};

const validPassword = (password) => {
  if (password.length < 6) {
    const objResp = {
      message: '"password" length must be 6 characters long',
      status: 400,
    };
    return objResp;
  }
  return false;
};

const existsEmail = (email) => {
  if (!email) {
    const objResp = {
      message: '"email" is required',
      status: 400,
    };
    return objResp;
  }
  return false;
};

const validEmail = (email) => {
  const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!regexEmail.test(email)) {
    const objResp = {
      message: '"email" must be a valid email',
      status: 400,
    };
    return objResp;
  }
  return false;
};

const validName = (displayName) => {
  if (displayName.length < 8) {
    const objResp = {
      message: '"displayName" length must be at least 8 characters long',
      status: 400,
    };
    return objResp;
  }
  return false;
};

const validateNameEmailPassword = (displayName, email, password) => {
  const validParamsName = validName(displayName);
  const validParamsEmail = validEmail(email);
  const validParamsPassword = validPassword(password);

  if (validParamsName.message) return validParamsName;
  if (validParamsEmail.message) return validParamsEmail;
  if (validParamsPassword.message) return validParamsPassword;

  return false;
};

const createUser = async (displayName, email, password, image) => {
  const passwordParams = existsPassword(password);
  const emailParams = existsEmail(email);

  if (passwordParams.message) return passwordParams;
  if (emailParams.message) return emailParams;

  const validateParams = validateNameEmailPassword(displayName, email, password);

  if (validateParams.message) return validateParams;
  
  const emailIsNotUnique = await User.findOne({ email });
  if (emailIsNotUnique) {
    const objResp = {
      message: 'User already registered',
      status: 409,
    };
    return objResp;
  }

  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

module.export = {
  createUser,
};
