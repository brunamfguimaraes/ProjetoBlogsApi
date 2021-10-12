require('dotenv/config');
const jwt = require('jsonwebtoken');

const LoginValidation = require('../schemas/login.validation');

const { SECRET } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '50m',
};

const login = async (userEmail, password) => {
  LoginValidation.verifyEmail(userEmail);
  LoginValidation.verifyPassword(password);
  const { id, displayName, email } = await LoginValidation.userExists(
    userEmail,
    password,
  );
  const payload = { id, displayName, email };
  const token = jwt.sign(payload, SECRET, jwtConfig);
  return token;
};

module.exports = { login };
