const jwt = require('jsonwebtoken');
const loginValidations = require('../validations/loginValidations');

const privateKey = process.env.JWT_SECRET;

const jwConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (email, password) => {
  loginValidations.validEmail(email);
  loginValidations.validPassword(password);
  const user = await loginValidations.validLogin(email, password);
  const token = jwt.sign({ data: user }, privateKey, jwConfig);
  return { token };
};

module.exports = {
  login,
};