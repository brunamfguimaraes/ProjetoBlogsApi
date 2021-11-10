require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtCfg = {
  algorithm: 'HS256',
  expiresIn: '2d',
};

const generateJWT = (payload) => jwt.sign(payload, JWT_SECRET, jwtCfg);

module.exports = {
  generateJWT,
};
