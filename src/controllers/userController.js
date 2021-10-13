require('dotenv').config();
const UserService = require('../services/userService');
const codes = require('../util/httpCodes');
const generateToken = require('../util/generateJWT');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '100d',
  algorithm: 'HS256',
};

const createUser = async (req, res, next) => {
  try {
    const userData = req.body;

    const user = await UserService.createUser(userData);

    const token = generateToken(user, jwtConfig, secret);

    return res.status(codes.created).json({ token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const loginData = req.body;

    const user = await UserService.login(loginData);

    const token = generateToken(user, jwtConfig, secret);

    return res.status(codes.ok).json({ token });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  createUser,
  login,
};
