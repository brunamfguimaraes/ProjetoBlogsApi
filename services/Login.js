require('dotenv/config');
const JWT = require('jsonwebtoken');

const { User } = require('../models');

const tokenGenerate = (payload) => {
  const token = JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

  return token;
};

const Login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  const { id, displayName } = user;
  
  return tokenGenerate({ id, displayName, email });
};

module.exports = Login;
