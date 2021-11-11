const { User } = require('../models');
const valid = require('../validations/User');
const utils = require('../utils');

const getAll = () => User.findAll(
  { attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } },
);

const createUser = async ({ displayName, email, password, image }) => {
  const searchForEmail = await valid.searchForExistingEmail(email, User);
  console.log(searchForEmail);
  const createdUser = await User.createUser({ displayName, email, password, image });
  console.log(createdUser);
  const createdToken = utils.createToken({ displayName, email });
  return createdToken;
};

const login = async ({ email, password }) => {
  const validUser = await User.findOne(
    { where: { email, password }, attributes: { exclude: ['password'] } },
  );
  valid.validateUser(validUser);
  const payload = validUser.dataValues;
  const createdToken = utils.createToken(payload);
  return createdToken;
};

const getUserById = async (id) => {
  const user = await User.findByPk(Number(id), {
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  });
  valid.checkUserExistence(user);
  return user;
};

const removeUser = async (id) => {
  const result = await User.destroy({ where: { id } });
  return result;
};

module.exports = {
  removeUser,
  getUserById,
  createUser,
  login,
  getAll,
};