require('dotenv/config');
const JWT = require('jsonwebtoken');

const { User } = require('../models');

const tokenGenerate = (payload) => {
  const TOKEN_SETTINGS = { algorithm: 'HS256', expiresIn: '1h' };
  const token = JWT.sign(payload, process.env.SECRET, TOKEN_SETTINGS);

  return token;
};

const Login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  const { id, displayName } = user;
  
  return tokenGenerate({ id, displayName, email });
};

module.exports = Login;
