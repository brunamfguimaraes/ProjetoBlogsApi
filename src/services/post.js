const { in: OpIn } = require('sequelize').Op;
const { BlogPosts, Category } = require('../../models');
const { postValidation } = require('../validations/post');

async function createPost(title, content, userId, categoryIds) {
  postValidation(title, content, categoryIds);
  const category = await Category.findAll({ where: { id: { [OpIn]: categoryIds } } });
  if (!category.length) {
    const error = new Error('"categoryIds" not found');
    error.code = 400;
    throw error;
  }
  const result = await BlogPosts.create({ title, content, userId });
  return result;
}

module.exports = {
  createPost,
};
