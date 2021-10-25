const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const createJWT = (user) => {
  const { id, email } = user;
  const jwtConfig = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };
  const token = jwt.sign({ id, email }, secret, jwtConfig);
  return token;
};

const verifyJWT = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
}; 

module.exports = { createJWT, verifyJWT };