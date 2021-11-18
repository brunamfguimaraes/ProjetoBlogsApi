require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const errorMessage = (code, message) => ({
  code,
  message,
});

module.exports = async (auth) => {
  if (!auth) {
    throw errorMessage('UNAUTHORIZED', 'Token not found');
  }

  const authToken = auth.split(' ');
  const [, token] = authToken;

  try {
    const { payload } = jwt.verify(token, process.env.JWT_SECRET);

    const users = await User.findByPk(payload.id);

    if (!users) {
      throw errorMessage('UNAUTHORIZED', 'Expired or invalid token');
    }
    
    return payload;
  } catch (error) {
    throw errorMessage('UNAUTHORIZED', 'Expired or invalid token');
  }
};