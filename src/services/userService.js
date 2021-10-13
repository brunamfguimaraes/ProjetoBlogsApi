const { User: UserModel } = require('../models');
const validations = require('../util/validations');

const createUser = async ({ displayName, email, password, image }) => {
  await validations.verifyCreateUserData(displayName, email, password);

  await UserModel.create({ displayName, email, password, image });
};

module.exports = {
  createUser,
};
