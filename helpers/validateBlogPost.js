const Joi = require('@hapi/joi');

const schemaBlogPosts = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.required(),
});

module.exports = {
  schemaBlogPosts,
};