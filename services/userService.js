const httpStatus = require('http-status');

const { User } = require('../models');
const generateToken = require('../utils/token');
const validate = require('../utils/validation');

const createUser = async ({ displayName, email, password, image }) => {
  await validate.createUser(displayName, email, password);
  const data = await User.create({ displayName, email, password, image });
  const token = generateToken(data);
  return ({ status: httpStatus.CREATED, token });
};

const getAll = async () => {
  const data = await User.findAll();
  return ({ status: httpStatus.OK, data });
};

const getById = async ({ id }) => {
  const data = await User.findOne({
    where: { id },
    attributes: { exclude: ['name', 'password'] },
  });
  validate.userExistById(data);
  return ({ status: httpStatus.OK, data });
};

const deleteById = async ({ id }) => {
  await User.destroy({ where: { id } });
  return ({ status: httpStatus.NO_CONTENT });
};

module.exports = {
  createUser,
  getAll,
  getById,
  deleteById,
};
