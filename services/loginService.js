const { User } = require('../models');

const verifyEmail = (email) => {
  if (email === undefined) {
    return { message: '"email" is required', status: 400 };
  }

  if (email.length === 0) {
    return { message: '"email" is not allowed to be empty', status: 400 };
  }

  return false;
};

const verifyPassword = (password) => {
  if (password === undefined) {
    return { message: '"password" is required', status: 400 };
  }

  if (password.length === 0) {
    return { message: '"password" is not allowed to be empty', status: 400 };
  }
  return false;
};

const login = async (email, password) => {
  const validEmail = verifyEmail(email);
  const validPassword = verifyPassword(password);

  if (validEmail.message) return validEmail;
  if (validPassword.message) return validPassword;

  const user = await User.findOne({ where: { email } });
  if (!user) return { message: 'Invalid fields', status: 400 };

  return user;
};

module.exports = {
  login,
};