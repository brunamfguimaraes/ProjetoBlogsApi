const Joi = require('joi');

const isValid = (title, content, categoryIds) => {
  const user = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().required(),
  });  
  const { error } = user.validate({ title, content, categoryIds });
  // console.log('isValid: ', error);
  if (error) return { message: error.details[0].message, error: true };
  return false;
};

module.exports = { isValid };