const Joi = require('joi');

const newUser = async (req, res, next) => {
  const { error } = Joi.object().keys({
    displayName: Joi.string().min(8).required().messages({
      'any.requred': '"displayName" length must be at least characters long',
    }),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
    }),
    image: Joi.string(),
  }).validate(req.body);

  if (error) {
    return next(error);
  }
  return next();
};

module.exports = newUser;
