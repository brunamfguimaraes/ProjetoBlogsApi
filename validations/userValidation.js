const Joi = require('joi');

const userDataEntries = (userData) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).not().empty()
      .required(),
    email: Joi.string().email().not().empty()
      .required(),
    image: Joi.string(),
    password: Joi.string().min(6).not().empty()
     .required()
     .messages({
       'string.min': '"password" length must be 6 characters long',
     }),
    }).validate(userData);

  if (error) {
    return { message: error.details[0].message };
  }
  return {};
};

module.exports = {
  userDataEntries,
};