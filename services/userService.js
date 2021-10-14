const { User } = require('../models');

const existsPasswordOrEmail = (email, password) => {
  if (!email) {
    const resp = {
      message: '"email" is required',
      status: 400,
    };
    return resp;
  }
  
  if (!password) {
    const resp = {
      message: '"password" is required',
      status: 400,
    };
    return resp;
  }

  return false;
};

const validateNameEmailPassword = (displayName, email, password) => {
  if (displayName.length < 8) {
    const resp = { message: '"displayName" length must be at least 8 characters long' };
    return resp;
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegex.test(email)) {
    const resp = { message: '"email" must be a valid email' };
    return resp;
  }

  if (password.length < 6) {
    const resp = { message: '"password" length must be 6 characters long' };
    return resp;
  }

  return false;
};

const respEmailUnique = {
  message: 'User already registered',
  status: 409,
};

const createUser = async (displayName, email, password, image) => {
  const validPassOrEmail = existsPasswordOrEmail(email, password);

  if (validPassOrEmail.message) {
    return validPassOrEmail;
  }

  const validates = validateNameEmailPassword(displayName, email, password);
  if (validates.message) {
    validates.status = 400;
    return validates;
  }

  const emailIsNotUnique = await User.findOne({ email });
  if (emailIsNotUnique) {
    return respEmailUnique;
  }

  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

module.exports = {
  createUser,
};
