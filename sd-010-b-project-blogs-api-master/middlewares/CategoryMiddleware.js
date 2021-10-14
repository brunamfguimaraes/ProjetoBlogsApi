const Joi = require('@hapi/joi');
const { renderError } = require('../helper/renderError');

const validateIfCategoryFieldsExist = (body) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty()
    .required(),
  })
    .validate(body);
  if (error) {
  return renderError(error); 
  }
};

module.exports = { validateIfCategoryFieldsExist };