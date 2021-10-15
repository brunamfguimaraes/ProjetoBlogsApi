const Joi = require('joi');
const { BlogPosts, Users, Categories } = require('../models');
const CategoryService = require('./CategoryService');

const validatePostInfo = (postInfo) => {
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    categoryIds: Joi.array().not().empty().required(),
  }).validate(postInfo);

  return error;
};

const verifyUpdate = (body) => {
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
  }).validate(body);

  return error;
};

const verifyCategoriesExist = async (categories) => {
  const listOfCategories = await CategoryService.findCategories();
  const arrayOfCategories = listOfCategories.map((cat) => cat.dataValues.id);
  return categories.every((category) => arrayOfCategories.includes(category));
};

const findPostAfterUpdate = async (id) => {
  const post = await BlogPosts.findByPk(id, {
    include: {
      model: Categories,
      as: 'categories',
      through: {
        attributes: [],
      },
    },
    attributes: { exclude: ['id', 'published', 'updated'] },
  });

  return post;
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

  await post.setCategories(categoryIds);

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

const editPost = async (id, body, userId) => {
  if (body.categoryIds) {
    return {
      error: { noEdit: true, message: 'Categories cannot be edited' },
    };
  }
  const invalidUpdate = verifyUpdate(body);

  if (invalidUpdate) return { error: invalidUpdate };

  const update = await BlogPosts.update(body, { where: { id, userId } });

  if (!update[0]) {
    return { error: { invalidUser: true, message: 'Unauthorized user' } };
  }
  const post = await findPostAfterUpdate(id);

  return post;
};

const removePost = async (id, userId) => {
  const postFound = await BlogPosts.findByPk(id);

  if (!postFound) {
    return { error: { postNotFound: true, message: 'Post does not exist' } };
  }

  const destroy = await BlogPosts.destroy({ where: { id, userId } });

  if (!destroy) {
    return { error: { invalidUser: true, message: 'Unauthorized user' } };
  }

  return true;
};

module.exports = { createPost, findPosts, findPost, editPost, removePost };
