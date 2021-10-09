const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/ApiError');
const { userValidate, loginValidate } = require('../schemas/validations');
const { User } = require('../../models');
const { tokenGenerator } = require('../utils/createToken');

const secret = process.env.JWT_SECRET;

const sendToken = async (req, next) => {
  const token = await tokenGenerator(req.body);
  req.token = token;
  next();
};

const checkIfUserExist = async (req, next) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next(new ApiError('Invalid fields', 400));
  }
  return sendToken(req, next);
};

const validateUser = async (req, res, next) => {
  const errorUser = await userValidate(req.body);
  if (errorUser.message) {
    return next(new ApiError(errorUser.message, errorUser.code));
  }
  return sendToken(req, next);
};

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const decoded = jwt.verify(authorization, secret);
    const { email } = decoded;

    const user = await checkIfUserExist(email);

    if (!user) {
      // return next(new ApiError(errorUser.message, errorUser.code));
      // return res.status(401).json({ message: 'jwt malformed' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const validateLogin = async (req, res, next) => {
  const loginData = await loginValidate(req.body);
  if (loginData.message) {
    return next(new ApiError(loginData.message, loginData.code));
  }

  await checkIfUserExist(req, next);
};

module.exports = {
  validateUser,
  verifyToken,
  validateLogin,
};
