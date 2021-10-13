const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const { JWT_SECRET } = process.env || 'minhaSenhaBlog';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const ERROR_INVALID_FIELDS = { status: 400, message: 'Invalid fields' };
const ERROR_USER_EXISTS = { status: 409, message: 'User already registered' };
// const ERROR_USER_NOT_EXISTS = { status: 404, message: 'User does not exist' };

const generateToken = (user) => {
  const token = jwt.sign({ data: user }, JWT_SECRET, jwtConfig);
  return { token };
};

const checkEmailExists = async (email) => {
  const emailExists = await User.findOne({ where: { email } });
  return emailExists;
};

const createUser = async (newUser) => {
  const { email } = newUser;
  const emailExists = await checkEmailExists(email);
  if (emailExists) { throw ERROR_USER_EXISTS; }
  const { password, ...user } = await User.create(newUser);
  await User.findOne({ where: { email, password } });
  // const token = generateToken(user);
  return generateToken(user);
  // return user;
};

const login = async ({ email, password }) => {
  const userRegistered = await checkEmailExists(email);
  if (!userRegistered) { throw ERROR_INVALID_FIELDS; }
  const { password: pwd, ...user } = await User.findOne({ where: { email, password } });
  return generateToken(user);
};

module.exports = {
  createUser,
  login,
};
