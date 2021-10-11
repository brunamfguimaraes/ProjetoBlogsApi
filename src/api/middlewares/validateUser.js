const Joi = require('joi');
const { badRequest } = require('../helpres/error');

const validateUser = (req, _res, next) => {
console.log('validade');

  const { error } = Joi.object({
    displayName: Joi.string().min(8).not().empty()
      .required(),
    email: Joi.string().email().not().empty()
      .required(),
    password: Joi.string().min(6).not().empty()
      .required()
      .messages({
        'string.min': '"password" length must be 6 characters long',
      }),
    image: Joi.string(),
  }).validate(req.body);
 
  if (error) return next(badRequest(error.message));
  console.log('aqui2');
  next();
};

module.exports = validateUser;
