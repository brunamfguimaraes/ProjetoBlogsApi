const Joi = require('@hapi/joi');
const { Op } = require('sequelize');
const { Category, BlogPost, User } = require('../../models');
const validateError = require('../middleweres/validateError');

const PostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required().messages({
    'array.base': '{{#label}} must be an array of numbers',
  }),
}).messages({
  'any.required': '{{#label}} is required',
  'string.empty': '{{#label}} is not allowed to be empty',
});

const createPost = async (post) => {
  const { title, content, categoryIds } = post;

  const { error } = PostSchema.validate(post);
  if (error) throw validateError(400, error.message);

  // const findCategory = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  // if (findCategory.length === 0) throw validateError(400, '"categoryIds" not found');

  const { dataValues } = await BlogPost.create({ title, content, categoryIds });
  const newPost = { ...dataValues };

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
