const Joi = require('@hapi/joi');

module.exports = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(6)
    .message('{#label} length must be 6 characters long'),
  image: Joi.string().required(),
});
