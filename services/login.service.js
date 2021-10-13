require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const LoginValidation = require('../schemas/login.validation');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '50m',
};

const login = async (userEmail, password) => {
  LoginValidation.verifyEmail(userEmail);
  LoginValidation.verifyPassword(password);
  const user = await User.findOne({ where: { email: userEmail, password } });
  if (!user) {
    const error = new Error('Invalid fields');
    error.code = 400;
    throw error;
  }
  const { id, displayName, email } = user;
  const payload = { id, displayName, email };
  const token = jwt.sign(payload, JWT_SECRET, jwtConfig);
  return token;
};

module.exports = { login };
