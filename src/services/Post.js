const Joi = require('@hapi/joi');
const { Op } = require('sequelize');
const { Category, BlogPost, User } = require('../../models');
const validateError = require('../middleweres/validateError');

const PostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.required(),
}).messages({
  'any.required': '{{#label}} is required',
});

const createPost = async (id, post) => {
  const { title, content, categoryIds } = post;

  const { error } = PostSchema.validate(post);
  if (error) throw validateError(400, error.message);

  if (typeof categoryIds !== 'object') throw validateError(400, 'Not a object');

  const findCategory = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  if (findCategory.length === 0) throw validateError(400, '"categoryIds" not found');

  const { dataValues } = await BlogPost.create({ title, content, categoryIds });
  const newPost = { ...dataValues, userId: id };

  return newPost;
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({ include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });

  return allPosts;
};

module.exports = {
  createPost,
  getAllPosts,
};
