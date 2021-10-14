const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const newToken = async (body) => {
  const { displayName, email, id } = body;

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ displayName, email, id }, secret, jwtConfig);

  return token;
};

module.exports = { newToken };
