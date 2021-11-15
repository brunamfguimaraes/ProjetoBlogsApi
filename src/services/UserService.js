require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { fieldsValidator, loginValidator } = require('../validators/UserValidator');

const secret = process.env.SECRET || 'naruto123';

const jwtCfg = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const createUser = async (fieldsData) => {
  const fields = fieldsValidator(fieldsData);

  if (fields.message) {
    return fields;
  }

  const alreadyExists = await User.findOne({ where: { email: fieldsData.email } });

  if (alreadyExists) {
    return { message: 'User already registered', conflict: true };
  }

  const { id, displayName, email, image } = await User.create(fieldsData);
  const payload = { id, displayName, email, image };
  const token = jwt.sign(payload, secret, jwtCfg);

  return token;
};

const getUsers = async () => User.findAll({ exclude: ['password'] });

const userLogin = async (email, password) => {
  const fields = loginValidator({ email, password });

  if (fields.message) {
    return fields;
  }

  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return { message: 'Invalid fields' };
  }

  return user;
};

module.exports = {
  createUser,
  getUsers,
  userLogin,
};
