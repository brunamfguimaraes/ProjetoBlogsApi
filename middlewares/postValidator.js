const isError = require('../utils/isError');
const { Categories, BlogPosts } = require('../models');
const { BAD_REQUEST, UNAUTHORIZED } = require('../utils/statusCode');

const validatePost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title) {
    return isError(res, BAD_REQUEST, '"title" is required');
  }
  if (!content) {
    return isError(res, BAD_REQUEST, '"content" is required');
  }
  if (!categoryIds) {
    return isError(res, BAD_REQUEST, '"categoryIds" is required');
  }

  next();
};

const validateCategoryExists = async (req, res, next) => {
  const { categoryIds } = req.body;

  const category = await Promise.all(
    categoryIds.map(async (id) => {
      const isCategory = await Categories.findOne({ where: { id } });
      return isCategory !== null;
    }),
  );
    
  if (category.includes(false)) {
    return isError(res, BAD_REQUEST, '"categoryIds" not found');
  }

  next();
};

const validatePostUpdate = async (req, res, next) => {
  const { categoryIds, title, content } = req.body;

  if (categoryIds) {
    return isError(res, BAD_REQUEST, 'Categories cannot be edited');
  }
  if (!title) {
    return isError(res, BAD_REQUEST, '"title" is required');
  }
  if (!content) {
    return isError(res, BAD_REQUEST, '"content" is required');
  }

  next();
};

const validatePostUpdateUser = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const post = await BlogPosts.findOne({ where: { id } });

  if (Number(post.userId) !== userId) {
    return isError(res, UNAUTHORIZED, 'Unauthorized user');
  }

  next();
};

module.exports = {
  validatePost,
  validateCategoryExists,
  validatePostUpdate,
  validatePostUpdateUser,
};