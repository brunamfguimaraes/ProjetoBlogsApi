const Joi = require('joi');

const validationLogin = (req, _res, next) => {
  const { error } = Joi.object().keys({
    email: Joi.string().email().required().empty(),
    password: Joi.string().min(6).not().empty()
    .required()
    .messages({ 'string.min': '"password" length must be 6 characters long' }),
  }).validate(req.body);
  if (error) {
    return next(error);
  }
  next();
};

module.exports = validationLogin;