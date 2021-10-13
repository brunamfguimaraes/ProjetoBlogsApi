const { User: UserModel } = require('../models');

const createUser = async ({ displayName, email, password, image }) => {
  const user = UserModel.create({ displayName, email, password, image });

  return user;
};

module.exports = {
  createUser,
};
