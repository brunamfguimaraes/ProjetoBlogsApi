const Joi = require('joi');
const { BlogPosts } = require('../models');
const CategoryService = require('./CategoryService');

const validatePostInfo = (postInfo) => {
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    categoryIds: Joi.array().not().empty().required(),
  }).validate(postInfo);

  return error;
};

const verifyCategoriesExist = async (categories) => {
  const listOfCategories = await CategoryService.findCategories();
  const arrayOfCategories = listOfCategories.map((cat) => cat.dataValues.id);
  return categories.every((category) => arrayOfCategories.includes(category));
};

const createPost = async (postInfo, userId) => {
  const invalidPost = validatePostInfo(postInfo);

  if (invalidPost) return { error: invalidPost };

  const { categoryIds, ...newPost } = postInfo;
  const post = await BlogPosts.create({ ...newPost, userId });
  const categoryExist = await verifyCategoriesExist(categoryIds);

  if (!categoryExist) {
    return {
      error: { categoryNotFound: true, message: '"categoryIds" not found' },
    };
  }

  return post;
};

const findPosts = async () => BlogPosts.findAll();

module.exports = { createPost, findPosts };
