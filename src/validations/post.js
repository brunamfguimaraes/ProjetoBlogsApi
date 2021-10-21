const Joi = require('joi');

function postValidation(title, content, categoryIds) {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate({ title, content, categoryIds });
  if (error) throw error;
}

function categoryValidation(category) {
  if (!category.length) {
    const error = new Error('"categoryIds" not found');
    error.code = 400;
    throw error;
  }
}

function checkPost(post) {
  if (!post) {
    const error = new Error('Post does not exist');
    error.code = 404;
    throw error;
  }
}

module.exports = {
  postValidation,
  categoryValidation,
  checkPost,
};
