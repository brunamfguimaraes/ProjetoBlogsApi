const Joi = require('joi');
const httpStatus = require('../httpStatus');

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

module.exports = {
  validateNameSignUp,
  validateEmailSignUp,
  validatePasswordSignUp,
};
