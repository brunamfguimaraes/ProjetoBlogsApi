const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (payload) => {
  const jwtConfig = {
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);

  return token;
};