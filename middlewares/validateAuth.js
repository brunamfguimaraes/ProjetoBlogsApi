require('dotenv').config();
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

const errorMessage = (code, message) => ({
  code,
  message,
});

module.exports = async (auth) => {
  if (!auth) {
    throw errorMessage('UNAUTHORIZED', 'Token not found');
  }

  try {
    const { payload } = jwt.verify(auth, process.env.JWT_SECRET);

    const users = await Users.findByPk(payload.id);

    if (!users) {
      throw errorMessage('UNAUTHORIZED', 'Expired or invalid token');
    }

    return payload;
  } catch (error) {
    throw errorMessage('UNAUTHORIZED', 'Expired or invalid token');
  }
};