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
    const resp = {
      message: '"displayName" length must be at least 8 characters long',
      status: 400,
    };
    return resp;
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegex.test(email)) {
    const resp = {
      message: '"email" must be a valid email',
      status: 400,
    };
    return resp;
  }

  if (password.length < 6) {
    const resp = {
      message: '"password" length must be 6 characters long',
      status: 400,
    };
    return resp;
  }

  return false;
};

const createUser = async (displayName, email, password, image) => {
  const validPassOrEmail = existsPasswordOrEmail(email, password);

  if (validPassOrEmail.message) {
    return validPassOrEmail;
  }

  const validates = validateNameEmailPassword(displayName, email, password);

  if (validates.message) {
    return validates;
  }

  const emailIsNotUnique = await User.findOne({ email });

  if (emailIsNotUnique) {
    const resp = {
      message: 'User already registered',
      status: 409,
    };
    return resp;
  }

  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

module.exports = {
  createUser,
};
