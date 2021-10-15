const Joi = require('@hapi/joi');

const schemaCategories = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  schemaCategories,
};