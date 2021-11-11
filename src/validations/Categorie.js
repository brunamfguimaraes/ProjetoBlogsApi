const Joi = require('joi');

const validateName = (bodyObj) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
  }).validate(bodyObj);

  if (error) throw error;
};

module.exports = {
  validateName,
};
