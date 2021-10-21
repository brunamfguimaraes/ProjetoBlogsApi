const Joi = require('joi');

function postValidation(title, content, categoryIds) {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate({ title, content, categoryIds });
  if (error) throw error;
}

module.exports = {
  postValidation,
};
