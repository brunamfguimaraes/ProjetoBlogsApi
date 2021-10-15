const Joi = require('@hapi/joi');

const schemaUser = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  image: Joi.string(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
});

module.exports = { 
  schemaUser, 
};
