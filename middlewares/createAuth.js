require('dotenv').config();
const jwt = require('jsonwebtoken');

const configure = {
  expiresIn: '7d',
  algorithm: 'HS256'
}

module.exports = (data) => {
  console.log('data', data)

  console.log(process.env)

  const segredo = 'brunobastos';

  const token = jwt.sign({ payload: data }, process.env.JWT_SECRET, configure);

  console.log('token', token);
  return token;
};