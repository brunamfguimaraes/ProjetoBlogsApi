const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const { code, errorMessage } = require('../schema/index');
require('dotenv/config');

const secret = process.env.SECRET;
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

/**
 * 
 * @param {object} user displayName, email, password, image
 * @returns code, notification
 */

const registerUser = async (user) => {
  const { email } = user;
  const findUser = await User.findOne({ where: { email } });

  if (findUser) {
    return {
      code: code.HTTP_CONFLICT,
      notification: { message: errorMessage('userConflict') },
    };
  }

  const { id, displayName } = await User.create(user);

  const token = jwt.sign({ id, displayName }, secret, jwtConfig);

  const registeredSuccessfully = {
    code: code.HTTP_CREATED,
    notification: {
      token,
    },
  };

  return registeredSuccessfully;
};

module.exports = {
  registerUser,
};
