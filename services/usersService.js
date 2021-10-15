const { User } = require('../models');
const createToken = require('../middlewares/generateJWT');

const userExistsErr = { 
  err: {
    status: 409,
    message: {
      message: 'User already registered',
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
      message: 'Campos inválidos',
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
        content: jwt,
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

const loginUser = async (userInfo) => {
  const userExists = await getUser(userInfo);
  if (userExists.err) return userExists;
  const { id } = userExists.dataValues;
  const { email } = userInfo;
  const jwt = createToken({ id, email });
  return {
    resp: {
      status: 201,
      content: jwt,
    },
  };
};

module.exports = {
  createUser,
  loginUser,
};