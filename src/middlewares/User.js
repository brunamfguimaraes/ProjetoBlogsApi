const Joi = require('joi');
const jwt = require('jsonwebtoken');
const httpStatus = require('../httpStatus');
require('dotenv').config();

const validateNameSignUp = (req, res, next) => {
  const { displayName } = req.body;
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
  }).validate({ displayName });
  if (schema.error) {
    const { error: { message } } = schema;
    return res.status(httpStatus.badRequest).json({
      message,
    });
  }
  next();
};

const validateEmailSignUp = (req, res, next) => {
  const { email } = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required(),
  }).validate({ email });
  if (schema.error) {
    const { error: { message } } = schema;
    return res.status(httpStatus.badRequest).json({
      message,
    });
  }
  next();
};

const validatePasswordSignUp = (req, res, next) => {
  const { password } = req.body;
  const schema = Joi.object({
    password: Joi.string().length(6).required(),
  }).validate({ password });
  if (schema.error) {
    const { error: { message } } = schema;
    return res.status(httpStatus.badRequest).json({
      message,
    });
  }
  next();
};

const verifyToken = (req, res, next) => {
  // https://github.com/tryber/sd-010-b-cookmaster/pull/90/files
  // :D
  try {
    if (!req.headers.authorization) {
      return res.status(httpStatus.unauthorized).json({ message: 'Token not found' });
    }
    const { authorization } = req.headers;
    const user = jwt.verify(authorization, process.env.JWT_SECRET);
    req.logged = user;
    next();
  } catch (e) {
    return res.status(httpStatus.unauthorized).json({
      message: 'Expired or invalid token',
    });
  }
};

module.exports = {
  validateNameSignUp,
  validateEmailSignUp,
  validatePasswordSignUp,
  verifyToken,
};
