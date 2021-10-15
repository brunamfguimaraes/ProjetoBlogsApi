const { User } = require('../models');
const codes = require('../middlewares/codes');
const Indexerror = require('../middlewares/Indexerror');
const errorMessages = require('../middlewares/errorMessages');
const verifyCreate = require('../middlewares/validations');

const removeUserPass = require('../middlewares/removeUserPass');

const create = async ({ displayName, email, password, image }) => {
  await verifyCreate.verifyCreateUser(displayName, email, password, image);
  const user = await User.create({ displayName, email, password });
  const userWithoutPass = removeUserPass(user);
  return userWithoutPass;
};

const createLogin = async ({ email, password }) => {
  await verifyCreate.verifyCreateLogin(email, password);

  const userLogin = await User.findOne({ where: { email } });
  const userWithoutPass = removeUserPass(userLogin);
  return userWithoutPass;
};

const getUsers = async () => {
  const users = await User.findAll();
  const userWithoutPass = users.map((user) => removeUserPass(user));
  return userWithoutPass;
};

const getById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Indexerror(codes.notFound, errorMessages.doesntExist);
  }
  return user;
};

module.exports = { create, createLogin, getUsers, getById };