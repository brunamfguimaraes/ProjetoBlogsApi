const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const creatorToken = async (payload) => {
  const jwtConfig = {
    expiresIn: '30m',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ payload }, secret, jwtConfig);

  return token;
};

module.exports = { creatorToken };