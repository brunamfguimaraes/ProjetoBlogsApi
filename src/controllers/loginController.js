require('dotenv');

const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const LoginService = require('../services/loginService');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const logUser = async (req, res) => {
  const { email } = req.body;
  const exists = await LoginService.findUser(email);

  if (exists.Error) return res.status(exists.code).json({ message: exists.message });

  const token = jwt.sign({ data: { email } }, secret, jwtConfig);
  res.status(StatusCodes.OK).json({ token });
};

module.exports = {
  logUser,
};
