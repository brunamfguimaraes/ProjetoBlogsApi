const { createToken } = require('../auth/createToken');
const { User } = require('../models');
const { loginEntries } = require('../validations/Login');

const attempLogin = async ({ email, password }) => {
  const invalidEntries = loginEntries({ email, password });

  if (invalidEntries.message) return invalidEntries;
  
  const loggedUser = await User.findOne({ where: { email, password } });

  if (!loggedUser) return { message: 'Invalid fields' };

  const { id: userId, displayName, email: loggedEmail } = loggedUser;

  const token = createToken({ userId, displayName, loggedEmail });

  return { token };
};

module.exports = {
  attempLogin,
};
