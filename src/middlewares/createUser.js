const Joi = require('@hapi/joi');
const Error = require('../helpers/errors');

const inputValidation = async (req, res, next) => {
  const { error } = Joi.object().keys({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
    }),
    image: Joi.string(),
  }).validate(req.body);

  const { code } = Error.badRequest();

  if (error) return res.status(code).json({ message: error.details[0].message });

  next();
};

module.exports = inputValidation;
