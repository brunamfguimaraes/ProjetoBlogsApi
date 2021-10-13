const { User } = require('../models');
const { checkLoginEntries } = require('../validations/loginValidations');

const userLogin = async (email, password) => {
  const entries = checkLoginEntries({ email, password });
  if (entries.message) return entries;

  const user = await User.findOne({ where: { email, password } });

  if (!user) return { message: 'Invalid fields' };

  return user;
};

module.exports = {
  userLogin,
};