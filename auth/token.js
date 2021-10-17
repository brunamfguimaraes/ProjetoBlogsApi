const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const token = async (id, displayName, email) =>
(jwt.sign({ data: { id, displayName, email } }, secret, jwtConfig));

module.exports = { token };
