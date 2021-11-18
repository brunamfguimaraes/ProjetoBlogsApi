require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (data) => {
  const token = jwt.sign({ payload: data }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  console.log('token', token);
  return token;
};