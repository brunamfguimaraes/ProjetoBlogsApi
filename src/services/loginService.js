const { User } = require('../sequelize/models');
const Error = require('../helpers/errors');

const findUser = async (email) => {
  const userFound = await User.findOne({ where: { email } });

  if (!userFound) return Error.badRequest('Invalid fields');

  return userFound;
};

module.exports = {
  findUser,
};
