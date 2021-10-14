const { User } = require('../models');

const checkEmail = (user) => {
  const { email } = user;
  const isValid = /\w+@\w+/g.test(email);

  if (!email) return { message: '"email" is required' };
  if (!isValid) return { message: '"email" must be a valid email' };
  return { message: 'ok' };
};

const checkName = (user) => {
  const { displayName } = user;
  if (!displayName) return { message: '"displayName" is required' };
  if (displayName.length < 8) {
    return { 
      message: '"displayName" length must be at least 8 characters long',
    }; 
  }
  return { message: 'ok' };
};

const checkPassword = (user) => {
  const { password } = user;
  if (!password) return { message: '"password" is required' };
  if (password.length !== 6) {
    return { message: '"password" length must be 6 characters long' };
  }
  return { message: 'ok' };
};

const emailAlreadyExists = async (user) => {
  const { email } = user;
  const check = await User.findOne({ where: { email } });
  if (check) return { message: 'User already registered' };
  return { message: 'ok' };
};

module.exports = {
  checkEmail,
  checkName,
  checkPassword,
  emailAlreadyExists,
};
