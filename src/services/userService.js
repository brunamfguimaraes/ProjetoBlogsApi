const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const { code, errorMessage } = require('../schema/index');
require('dotenv/config');

const createToken = (obj) => {
  const secret = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(obj, secret, jwtConfig);
  
  return token;
};

/**
 * 
 * @param {object} user displayName, email, password, image
 * @returns code, notification
 */

const registerUser = async (user) => {
  const { email } = user;
  const isConflict = await User.findOne({ where: { email } });

  if (isConflict) {
    return {
      code: code.HTTP_CONFLICT,
      notification: { message: errorMessage('userConflict') },
    };
  }

  const { id, displayName } = await User.create(user);

  const generateToken = createToken({ id, displayName });

  const registeredSuccessfully = {
    code: code.HTTP_CREATED,
    notification: {
      token: generateToken,
    },
  };

  return registeredSuccessfully;
};

/**
 * 
 * @param {object} userData email, password
 * @returns code, notication
 */

const loginUser = async (userData) => {
  const { email } = userData;
  const findUser = await User.findOne({ where: { email } });

  if (findUser === null) {
    return {
      code: code.HTTP_BAD_REQUEST,
      notification: { message: errorMessage('nonExistentUser') },
    };
  }

  const generateToken = createToken({ email });

  const userFound = {
    code: code.HTTP_OK_STATUS,
    notification: { token: generateToken },
  };

  return userFound;
};

const getUser = async () => {
  const findAll = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });

  const allUser = {
    code: code.HTTP_OK_STATUS,
    notification: findAll,
  };

  return allUser;
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
