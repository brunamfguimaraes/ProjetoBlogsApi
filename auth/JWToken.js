const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const createJWT = async (payload) => {
  const newToken = jwt.sign(payload, secret, {
    algorithm: 'HS256',
  });
  return newToken;
};

const verifyJWT = async () => {
  
};

module.exports = { createJWT, verifyJWT };