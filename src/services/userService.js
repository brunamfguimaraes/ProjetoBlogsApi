const { User } = require('../sequelize/models');
const Error = require('../helpers/errors');

const createUser = async (dataUser) => {
  const { email } = dataUser;
  const repeatedEmail = await User.findOne({ where: { email } });

  if (repeatedEmail) return Error.conflict('User already registered');

  return User.create(dataUser);
};

const getAll = async () => {
  const allUsers = await User.findAll();

  return allUsers;
};

module.exports = {
  createUser,
  getAll,
};
