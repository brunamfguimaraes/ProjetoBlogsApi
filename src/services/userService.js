const { User } = require('../sequelize/models');

const createUser = async (dataUser) => {
  const newUser = await User.create(dataUser);
  return newUser;
};

module.exports = {
  createUser,
};
