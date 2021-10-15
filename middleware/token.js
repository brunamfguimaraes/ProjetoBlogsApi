require('dotenv/config');
const jwt = require('jsonwebtoken');

const createToken = (email) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ email }, process.env.JWT_SECRET, jwtConfig);
  
  return token;
};

module.exports = createToken;