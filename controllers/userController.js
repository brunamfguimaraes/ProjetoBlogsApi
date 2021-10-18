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
  try {
    await User.create({ displayName, email, password, image });
    const token = await jwt.sign(
      { data: { displayName, email } }, JWT_SECRET, jwfConfig,
);
    
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
};

const findLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const validate = userService.findLogin(email, password);
  if (validate.message) {
    return next({ status: validate.status, message: 'Campos inválidos' });
  }
  try {
    const user = await User.findAll({ where: { email, password } });
    const token = jwt.sign({ data: { user: user.displayName, email } }, JWT_SECRET, jwfConfig);
    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
  findLogin,
};