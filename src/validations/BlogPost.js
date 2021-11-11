const Joi = require('joi');
const { in: opIn } = require('sequelize').Op;

const validateBlogBody = (object) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(object);

  if (error) throw error;
};

const updateBlogBody = (object) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.forbidden().messages({ 'any.unknown': 'Categories cannot be edited' }),
  }).validate(object);

  if (error) throw error;
};

const validateCategoryIds = async (categoryIds, Model) => {
  const categories = await Model.findAll({ where: { id: { [opIn]: categoryIds } } });
  if (!categories.length) {
    const error = new Error('"categoryIds" not found');
    error.statusCode = 400;
    throw error;
  }
};

const validatePostExistence = (post) => {
  if (!post) {
    const error = new Error('Post does not exist');
    error.statusCode = 404;
    throw error;
  }
};

const validatePostUserProperty = (postUserId, userId) => {
  if (postUserId !== userId) {
    const error = new Error('Unauthorized user');
    error.statusCode = 401;
    throw error;
  }
};

module.exports = {
  validatePostExistence,
  validatePostUserProperty,
  updateBlogBody,
  validateCategoryIds,
  validateBlogBody,
};
