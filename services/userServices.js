const { User } = require('../models');

const verifyCreate = require('../middlewares/validations');

const removeUserPass = require('../middlewares/removeUserPass');

const create = async ({ displayName, email, password, image }) => {
  await verifyCreate.verifyCreateUser(displayName, email, password);
  const user = await User.create({ displayName, email, password, image });
  const userWithoutPass = removeUserPass(user);
  return userWithoutPass;
};

const createLogin = async ({ email, password }) => {
  await verifyCreate.verifyCreateLogin(email, password);

  const userLogin = await User.findOne({ where: { email } });
  const userWithoutPass = removeUserPass(userLogin);
  return userWithoutPass;
};

module.exports = { create, createLogin };