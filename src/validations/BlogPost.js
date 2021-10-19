const Joi = require('joi');

const blogBody = (bodyObj) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(bodyObj);

  if (error) throw error;
};

module.exports = {
  blogBody,
};
