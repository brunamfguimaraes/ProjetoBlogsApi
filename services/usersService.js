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

const createUser = async (userInfo) => {
  const { displayName, email } = userInfo;
  const userExists = await User.findOne({ where: { email } });
  if (userExists) return userExistsErr;
  try {
    console.log(userInfo);
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

module.exports = {
  createUser,
};