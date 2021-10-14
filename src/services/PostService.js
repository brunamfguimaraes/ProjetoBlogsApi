const Joi = require('joi');
const { BlogPosts, Users, Categories, PostsCategories } = require('../models');
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

  await categoryIds.forEach((id) => {
    PostsCategories.create({
      postId: post.id,
      categoryId: id,
    });
  });

  return post;
};

const findPosts = async () => {
  const response = await BlogPosts.findAll({
    include: [
      { model: Users, as: 'user', attributes: { exclude: 'password' } },
      {
        model: Categories,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
    ],
  });

  return response;
};

const findPost = async (id) => {
  const post = await BlogPosts.findByPk(id, {
    include: [
      { model: Users, as: 'user', attributes: { exclude: 'password' } },
      {
        model: Categories,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
    ],
  });
  if (!post) {
    return {
      error: { postNotFound: true, message: 'Post does not exist' },
    };
  }

  return post;
};

module.exports = { createPost, findPosts, findPost };
