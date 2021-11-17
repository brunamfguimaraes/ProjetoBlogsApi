require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (userData) => {
  const token = jwt.sign(userData.dataValues, secret, jwtConfig);

  return token;
};

module.exports = createToken;
