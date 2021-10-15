const { User } = require('../../models');
const utils = require('../utils');
const valid = require('../validations/User');

const getAll = () => User.findAll(
  { attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } },
);

const getById = async (id) => {
  const user = await User.findByPk(Number(id), {
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  });
  valid.checkIfUserExists(user);
  return user;
};

const create = async ({ displayName, email, password, image }) => {
  await valid.checkEmailExists(email, User);
  await User.create({ displayName, email, password, image });
  const token = utils.createToken({ displayName, email });
  return token;
};

const login = async ({ email, password }) => {
  const validUser = await User.findOne({ where: { email, password } });
  valid.checkEntries(validUser);
  const { _password, ...payload } = validUser;
  const token = utils.createToken(payload);
  return token;
};

module.exports = {
  getAll,
  getById,
  create,
  login,
};
