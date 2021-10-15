const { User } = require('../models');
const createToken = require('../middlewares/generateJWT');

const userExistsErr = { 
  err: {
    status: 409,
    message: {
      message: 'User already registered',
    },
} };

const userNotExistsErr = { 
  err: {
    status: 404,
    message: {
      message: 'User does not exist',
    },
} };

const genericError = {
  err: {
    status: 500,
    message: {
      message: 'Undefined error',
    },
} };

const loginError = {
  err: {
    status: 400,
    message: {
      message: 'Invalid fields',
    },
} };

const createUser = async (userInfo) => {
  const { displayName, email } = userInfo;
  const userExists = await User.findOne({ where: { email } });
  if (userExists) return userExistsErr;
  try {
    const { id } = await User.create(userInfo);
    const jwt = createToken({ id, displayName, email });
    return {
      resp: {
        status: 201,
        content: {
          token: jwt,
        },
      },
    };
  } catch (e) { return genericError; }
};

const getUser = async (userInfo) => {
  const { email, password } = userInfo;
  const userExists = await User.findOne({ where: { email, password } });
  try {
    return userExists;
  } catch (e) { return loginError; }
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  try {
    return {
      resp: {
        status: 200,
        content: users,
      },
    };
  } catch (e) { return genericError; }
};

const getUserById = async (userInfo) => {
  const { id } = userInfo;
  const user = await User.findOne({ where: { id } });
  try {
    return {
      resp: {
        status: 200,
        content: user,
      },
    };
  } catch (e) { return userExistsErr; }
};

const loginUser = async (userInfo) => {
  const userExists = await getUser(userInfo);
  if (userExists === null) return loginError;
  const { id } = userExists.dataValues;
  const { email } = userInfo;
  const jwt = createToken({ id, email });
  return {
    resp: {
      status: 200,
      content: {
        token: jwt,
      },
    },
  };
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
};