require('dotenv').config();
const JWT = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const options = {
  algorithm: 'HS256',
  expiresIn: '40m',
};

function createToken(payload) {
  const token = JWT.sign(payload, secret, options);
  return token;
}

module.exports = {
  createToken,
};
