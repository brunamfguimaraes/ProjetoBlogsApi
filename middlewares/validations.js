const { User } = require('../models');

const validName = ({ displayName }) => {
  if (!displayName || displayName.length < 8) {
    return { message: '"displayName" length must be at least 8 characters long' };
  }
  return true;
};

const validEmail = ({ email }) => {
  const regEmail = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  if (!email) {
    return { message: '"email" is required' };
  }
  if (!regEmail.test(email)) {
    return { message: '"email" must be a valid email' };
  }
  return true;
};

const validPassword = ({ password }) => {
  if (!password) {
    return { message: '"password" is required' };
  }
  if (password.length < 6) {
    return { message: '"password" length must be 6 characters long' };
  }
};

const alreadyExists = async (user) => {
  const { email } = user;
  const findUser = await User.findOne({ where: { email } });
  if (findUser) {
    return { message: 'User already registered' };
  }
  return true;
};

module.exports = {
  validName,
  validEmail,
  validPassword,
  alreadyExists,
};
