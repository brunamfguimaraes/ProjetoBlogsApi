const { User } = require('../models');

const validateEmail = (email) => {
  const regexEmail = /\b[\w.-]+@[\w.-]+.\w{2,4}\b/;
  if (!regexEmail.test(email)) {
      return false;
  }

  return true;
};

const existEmail = async (entryEmail) => {
  const existingEmail = await User.findOne({ where: { email: entryEmail } });
  if (existingEmail) { return { message: 'User already registered' }; }
  return true;
};

const findUser = async ({ email, password }) => {
  const userFound = await User.findOne({ where: { email, password } });
  if (!userFound) return false;
  return true;
};

module.exports = {
  validateEmail,
  existEmail,
  findUser,
};