const { User } = require('../models');

const validUser = async ({ email, password }) => {
  const result = await User.findOne({ where: { email } });
  console.log(result);
  if (result && result.password === password) { return User; }
  return null;
};

module.exports = {
  validUser,
};