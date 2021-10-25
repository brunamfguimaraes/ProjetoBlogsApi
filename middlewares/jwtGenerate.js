const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfiguration = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfiguration);
  return token;
};
