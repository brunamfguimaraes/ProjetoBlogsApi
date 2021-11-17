const { StatusCodes } = require('http-status-codes');

const RepositoryUsers = require('../repository/RepositoryUsers');
const { createToken } = require('../middlewares');
const invalidData = require('../utils/invalidData');

const create = async ({ displayName, email, password, image }) => {
  const findEmail = await RepositoryUsers.getByEmail({ email });

  if (findEmail) throw invalidData('User already registered', StatusCodes.CONFLICT);

  const createdUser = await RepositoryUsers.create({
    displayName,
    email,
    password,
    image,
  });

  const { password: passBD, ...userWithoutPassword } = createdUser;

  const token = await createToken(userWithoutPassword);

  return token;
};

const login = async ({ email, password }) => {
  const findUserByEmail = await RepositoryUsers.getByEmail({ email });

  if (!findUserByEmail || findUserByEmail.password !== password) {
    throw invalidData('Invalid fields', StatusCodes.BAD_REQUEST);
  }

  const { password: passBD, ...userWithoutPassword } = findUserByEmail;

  const token = await createToken(userWithoutPassword);

  return { token };
};

const getAll = async () => {
  const getAllUsers = await RepositoryUsers.getAll();

  return getAllUsers;
};

module.exports = {
  create,
  login,
  getAll,
};
