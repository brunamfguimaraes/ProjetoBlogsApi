require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = '123456';
// const SECRET = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = async (body) => {
const token = jwt.sign(body, SECRET, jwtConfig);
return token;
};

module.exports = generateToken;