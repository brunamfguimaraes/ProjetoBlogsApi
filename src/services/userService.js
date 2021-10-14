require('dotenv').config();
const jwt = require('jsonwebtoken');
const { userDataEntries } = require('../validations/userValidation');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createUser = async (userData) => {
  const entries = userDataEntries(userData);
  if (entries.message) return entries;

  const isConflict = await User.findOne({ where: { email: userData.email } });
  if (isConflict) return { message: 'User already registered', conflict: true };

  const { id, displayName, email, image } = await User.create(userData);
  const payload = { id, displayName, email, image };

  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

const getAllUsers = async () => User.findAll({ exclude: ['password'] });

const getById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return { message: 'User does not exist' };

  return user;
};

const removeUser = async (userId) => User.destroy({ where: { id: userId } });

module.exports = {
  createUser,
  getAllUsers,
  getById,
  removeUser,
};