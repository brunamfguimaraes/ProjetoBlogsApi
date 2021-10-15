require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = '123456';
// const SECRET = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = async (body) => {
const { id, displayName, email } = body;
const token = jwt.sign({ id, displayName, email }, SECRET, jwtConfig);
return token;
};

module.exports = { generateToken };