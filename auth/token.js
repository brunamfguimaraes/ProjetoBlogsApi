const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const token = async (user) => {
  const { displayName, email } = user;

  const newToken = await jwt.sign({ displayName, email }, secret, jwtConfig);

  return newToken;
};


module.exports = { token };
