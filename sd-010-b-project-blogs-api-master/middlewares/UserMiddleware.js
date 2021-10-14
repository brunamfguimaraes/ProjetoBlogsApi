const Joi = require('@hapi/joi');
const { renderError } = require('../helper/renderError');

const validateIfFieldsExist = (body) => {
  const { error } = Joi.object({
    displayName: Joi.string().not().empty()
    .min(8)
    .required(),
    email: Joi.string()
    .email().required(),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
    }),
    image: Joi.string().required(),
  })
    .validate(body);
  if (error) {
  return renderError(error); 
  }
};

const validateIfLoginFieldsExist = (body) => {
  const { error } = Joi.object({
    email: Joi.string()
    .email().required(),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
    }),
  })
    .validate(body);
  if (error) {
  return renderError(error); 
  }
};

module.exports = { validateIfFieldsExist, validateIfLoginFieldsExist };