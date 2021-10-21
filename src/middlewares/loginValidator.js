const Joi = require('@hapi/joi');
const Error = require('../helpers/errors');

const inputValidator = async (req, res, next) => {
  const { error } = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(req.body);

  const { code } = Error.badRequest();

  if (error) return res.status(code).json({ message: error.details[0].message });

  next();
};

module.exports = inputValidator;
