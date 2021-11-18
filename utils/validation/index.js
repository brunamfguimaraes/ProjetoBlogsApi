const user = require('./validationUser');

const createUser = async ({ displayName, email, password }) => {
  user.displayNameUser(displayName);
  user.passwordUser(password);
  user.emailUser(email);
  await user.userExist(email);
};

module.exports = { createUser };
