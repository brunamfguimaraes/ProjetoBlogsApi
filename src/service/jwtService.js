const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const generateJwtToken = async (user) => {
  try {
    const payLoad = { data: user };

    const token = jwt.sign(payLoad, secret, jwtConfig);
  
    return token;
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  generateJwtToken,
};
