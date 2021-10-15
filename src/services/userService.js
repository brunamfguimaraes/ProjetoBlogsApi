const { User: UserModel } = require('../models');
const validations = require('../util/validations');
const removeUserPass = require('../util/removeUserPass');
const AppError = require('../util/appError');

const codes = require('../util/httpCodes');
const messages = require('../util/errorMessages');

const createUser = async ({ displayName, email, password, image }) => {
  await validations.verifyCreateUserData(displayName, email, password);

  const user = await UserModel.create({ displayName, email, password, image });
  const userWithoutPass = removeUserPass(user);

  return userWithoutPass;
};

const login = async ({ email, password }) => {
  await validations.verifyLoginData(email, password);

  const user = await UserModel.findOne({ where: { email } });
  const userWithoutPass = removeUserPass(user);

  return userWithoutPass;
};

const getUsers = async () => {
  const users = await UserModel.findAll();

  const usersWithoutPass = users.map((user) => removeUserPass(user));

  return usersWithoutPass;
};

const getUserById = async (id) => {
  const user = await UserModel.findByPk(id);

  if (!user) throw new AppError(codes.notFound, messages.userNotFound);

  return removeUserPass(user);
};

const deleteUser = async (id) => {
  await UserModel.destroy(
    { where: { id } },
  );

  return null;
};

module.exports = {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  login,
};
