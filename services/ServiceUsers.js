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

module.exports = {
  create,
};
