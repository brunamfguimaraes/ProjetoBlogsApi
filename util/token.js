const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (email) => jwt.sign({ data: email }, process.env.JWT_SECRET, jwtConfig);

const emailDecoder = (token) => jwt.decode(token, process.env.JWT_SECRET, jwtConfig);

module.exports = {
    createToken,
    emailDecoder,
};