const Joi = require('joi');

const loginUser = async (req, res, next) => {
  const { error } = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
    }),
  }).validate(req.body);

  if (error) {
    return next(error);
  }
  return next();
};

module.exports = loginUser;
