const { user } = require('../models');
const createToken = require('../middlewares/generateJWT');

const userExistsErr = { 
  err: {
    status: 409,
    message: 'User already registered',
} };

const genericError = {
  err: {
    status: 500,
    message: 'Undefined error',
} };

const createUser = async (userInfo) => {
  const { displayName, email } = userInfo;
  const userExists = await user.findOne({ where: { email } });
  if (userExists) return userExistsErr;
  try {
    const { id } = await user.create(userInfo);
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