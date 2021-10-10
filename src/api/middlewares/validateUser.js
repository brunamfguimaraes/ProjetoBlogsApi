const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/ApiError');
const {
  userValidate,
  loginValidate,
  tokenValidate,
} = require('../schemas/validations');
const { User } = require('../../models');
const { tokenGenerator } = require('../utils/createToken');

const secret = process.env.JWT_SECRET;

const sendToken = async (req, next) => {
  const token = await tokenGenerator(req.body);
  req.token = token;
  next();
};

const checkIfUserExist = async (email, _next) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const validateUser = async (req, res, next) => {
  const errorUser = await userValidate(req.body);
  if (errorUser.message) {
    return next(new ApiError(errorUser.message, errorUser.code));
  }
  return sendToken(req, next);
};

const checkJwt = async (next, req, res) => {
  const { authorization } = req.headers;

  try {
    const decoded = jwt.verify(authorization, secret);
    const { email } = decoded;

    const user = await checkIfUserExist(email);

    if (!user) {
      return next(new ApiError('User does not exsit', 404));
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new ApiError('Token not found', 401));
  }

  if (!tokenValidate(authorization)) {
    return next(new ApiError('Expired or invalid token', 401));
  }

  return checkJwt(next, req, res);
};

const validateLogin = async (req, res, next) => {
  const loginData = await loginValidate(req.body);
  if (loginData.message) {
    return next(new ApiError(loginData.message, loginData.code));
  }

  const user = await checkIfUserExist(req.body.email, next);
  if (!user) {
    return next(new ApiError('Invalid fields', 400));
  }
  return sendToken(req, next);
};

module.exports = {
  validateUser,
  verifyToken,
  validateLogin,
};
