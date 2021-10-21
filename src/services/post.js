const { in: OpIn } = require('sequelize').Op;
const { BlogPosts, Category, User } = require('../../models');
const { postValidation, categoryValidation, checkPost } = require('../validations/post');

async function createPost(title, content, userId, categoryIds) {
  postValidation(title, content, categoryIds);
  const category = await Category.findAll({ where: { id: { [OpIn]: categoryIds } } });
  categoryValidation(category);
  const result = await BlogPosts.create({ title, content, userId });
  return result;
}

async function getPosts() {
  const result = await BlogPosts.findAll({ include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
  return result;
}

async function getPostById(id) {
  const result = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  checkPost(result);
  return result;
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
};
