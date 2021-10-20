const { User } = require('../models');
const validateUser = require('../utils/validation/validationUser');

const create = async (user) => {
  validateUser.displayNameUser(user);
  validateUser.emailUser(user);
  validateUser.passwordUser(user);
  await validateUser.userExist(user);
  const response = await User.create(user);
  return response;
};

module.exports = {
  create,
};
