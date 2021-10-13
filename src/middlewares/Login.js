const Joi = require('joi');
const httpStatus = require('../httpStatus');

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  }).validate({ email, password });
  if (schema.error) {
    const { error: { message } } = schema;
    return res.status(httpStatus.badRequest).json({
      message,
    });
  }
  next();
};

module.exports = {
  validateLogin,
};
