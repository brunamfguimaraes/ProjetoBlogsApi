require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const userService = require('../services/userService');

const { JWT_SECRET } = process.env;
const jwfConfig = {
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
    { data: { displayName, email } }, JWT_SECRET, jwfConfig,
  );
  console.log(token);
  return res.status(201).json({ token });
};

const findLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const validate = userService.findLogin(email, password);
  if (validate.message) {
    return next({ status: validate.status, message: 'Campos inválidos' });
  }
    const user = await User.findAll({ where: { email, password } });
    const token = jwt.sign({ data: { user: user.displayName, email } }, JWT_SECRET, jwfConfig);
    return res.status(200).json({ token });
};

const findUsers = async (req, res, next) => {
  const token = req.headers.authorization;
  const validate = await userService.findUsers(token);
  if (validate.message) {
    return next(validate);
  }
    const users = await User.findAll();
    return res.status(200).json(users);
};

module.exports = {
  createUser,
  findLogin,
  findUsers,
};