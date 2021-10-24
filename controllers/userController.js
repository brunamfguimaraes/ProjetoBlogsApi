require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const userService = require('../services/userService');

const { JWT_SECRET } = process.env;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const valid = await userService.createUser(displayName, email, password, image);
  if (valid.message) {
    return next(valid);
  }
  await User.create({ displayName, email, password, image });
  const token = jwt.sign(
    { data: { displayName, email } }, JWT_SECRET, jwtConfig,
  );
  console.log(token);
  return res.status(201).json({ token });
};

const findLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const validate = userService.findLogin(email, password);
  if (validate.message) {
    return next(validate);
  }
    const user = await User.findAll({ where: { email } });
    if (user.length < 1) {
      return next({ status: 400, message: 'Invalid fields' });
    }

    const token = jwt.sign({ data: { user: user.displayName, email } }, JWT_SECRET, jwtConfig);
    return res.status(200).json({ token });
};

const findUsers = async (req, res, next) => {
  const token = req.headers.authorization;
  const validate = userService.validateToken(token);
  if (validate.message) {
    return next(validate);
  }
    const users = await User.findAll();
    return res.status(200).json(users);
};

const findById = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const validate = userService.validateToken(token);
  if (validate.message) {
    return next(validate);
  }
  const user = await User.findByPk(id);
  if (user === null) {
    return next({ status: 404, message: 'User does not exist' });
  }
  return res.status(200).json(user);
};

module.exports = {
  createUser,
  findLogin,
  findUsers,
  findById,
  jwtConfig,
};