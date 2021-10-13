const Joi = require('joi');

const validationCategory = (body) => 
  Joi.object({
    name: Joi.required(),
  }).validate(body);

module.exports = validationCategory;