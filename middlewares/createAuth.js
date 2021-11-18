require('dotenv').config();
const jwt = require('jsonwebtoken');

const configure = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = (data) => {
  const token = jwt.sign({ payload: data }, process.env.JWT_SECRET, configure);

  return token;
};