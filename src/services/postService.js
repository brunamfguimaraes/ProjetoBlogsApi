const { Op } = require('sequelize');
const { BlogPost, User } = require('../../models');
const { ERROR_CATEGORY_NOT_FOUND } = require('./msgErrors');

const checkCategoryExists = async (categoryIds) => {
  const categoryExists = await User.findAll({ where: { id: { [Op.in]: categoryIds } } });
  if (categoryExists.length === categoryIds.length) { return true; }
  return false;
};

const createPost = async (newPost, userId = 1) => {
  const { title, content, categoryIds } = newPost;
  const categoryExists = await checkCategoryExists(categoryIds);
  if (!categoryExists) { throw ERROR_CATEGORY_NOT_FOUND; }

  await BlogPost.create({ title, content, userId });
  const post = await BlogPost.findOne({ where: { title, content, userId } });
  
  return post;
};

module.exports = {
  createPost,
};
