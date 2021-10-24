const { User } = require('../models')

const validateEmail = (email) => {
  const regexEmail = /\b[\w.-]+@[\w.-]+.\w{2,4}\b/;
  if (!regexEmail.test(email)) {
      return false;
  }

  return true;
};

const existEmail = async (entryEmail) => {
  const existEmail = await User.findOne({ where: { email: entryEmail } });
  if (existEmail) { return { message: 'User already registered' }; }
  return true;
};

module.exports = {
  validateEmail,
  existEmail,
}