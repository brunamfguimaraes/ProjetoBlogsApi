const Joi = require('@hapi/joi');

module.exports = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.optional(),
});
