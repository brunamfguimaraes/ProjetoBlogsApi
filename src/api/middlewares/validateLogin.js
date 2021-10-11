const Joi = require('joi');
const { badRequest } = require('../helpres/error');

const validateLogin = (req, _res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().not().empty()
      .required(),
    password: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(badRequest(error.message));

  next();
};

module.exports = validateLogin;