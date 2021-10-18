require('dotenv').config();
const UserService = require('../services/userService');
const codes = require('../util/httpCodes');
const generateToken = require('../util/generateJWT');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '100d',
  algorithm: 'HS256',
};
const ok = (_req, res) => res.status(200).send('funcionando biiiIIIIto esse trem');

const createUser = async (req, res, next) => {
  try {
    const user = req.body;

    await UserService.createUser(user);
    // if (error) return next(error);

    const token = generateToken(user, jwtConfig, secret);

    return res.status(codes.created).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  ok,
  createUser,
};