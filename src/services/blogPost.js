const Joi = require('@hapi/joi');
const { Op } = require('sequelize');
const { BlogPost, Category } = require('../../models');
const validateError = require('../middleweres/validateError');

const PostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.required(),
}).messages({
  'any.required': '{{#label}} is required',
});

const createPost = async (post) => {
  const { categoryIds } = post;

  // valida as informações do body usando o Joi
  const { error } = PostSchema.validate(post);
  if (error) throw validateError(400, error.message);

  if (typeof categoryIds !== 'object') throw validateError(400, 'Not a object');

  const findCategory = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });

  if (findCategory.length === 0) throw validateError(400, 'categoryIds" not found');

  // cria o novo post
  const newPost = await BlogPost.create(post);
  return newPost;
};

module.exports = {
  createPost,
};
