const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const token = async (body) => {
  const { displayName, email } = body;

  const jwtConfig = {
    expiresIn: '5d',
    algorithm: 'HS256',
  };

  const newToken = jwt.sign({ displayName, email }, secret, jwtConfig);

  return newToken;
};

module.exports = { token };
