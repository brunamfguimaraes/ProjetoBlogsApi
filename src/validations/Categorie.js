const Joi = require('joi');

const checkName = (bodyObj) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
  }).validate(bodyObj);
  
  if (error) throw error;
};

module.exports = {
  checkName,
};
