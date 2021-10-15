const Joi = require('@hapi/joi');
const { renderError } = require('../helper/renderError');

const validateIfPostBlogPostFieldsExist = (body) => {
  const { error } = Joi.object({
    title: Joi.string().not().empty()
    .required(),
    content: Joi.string().not().empty()
    .required(),
    categoryIds: Joi.array().not().empty().required(),
  })
    .validate(body);
  if (error) {
  return renderError(error); 
  }
};

 module.exports = { validateIfPostBlogPostFieldsExist };