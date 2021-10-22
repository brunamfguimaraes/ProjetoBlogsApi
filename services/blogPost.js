const { BlogPost, User, Category } = require('../models');

const createPost = async ({ title, content, categoryIds, userId }) => {
  const result = await BlogPost.create({ title, content, categoryIds, userId });
  return result;
};

const findAllPosts = async () => {
  const result = await BlogPost.findAll(
    { include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories' }] },
);
  return result;
};

module.exports = {
  createPost,
  findAllPosts,
};