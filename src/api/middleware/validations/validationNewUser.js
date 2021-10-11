const Joi = require('joi');

const validationNewUser = (req, _res, next) => {
  const { error } = Joi.object().keys({
    displayName: Joi.string().min(8).max(50)
    .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).not().empty()
    .required()
    .messages({ 'string.min': '"password" length must be 6 characters long' }),
    image: Joi.string(),
  }).validate(req.body);
  if (error) {
    return next(error);
  }
  next();
};

module.exports = validationNewUser;