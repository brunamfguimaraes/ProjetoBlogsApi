const { PostsCategories } = require('../models');

const createPostsCategory = async ({ postId, categoryId }) => {
  const result = await PostsCategories.create({ postId, categoryId });

  return result;
};

module.exports = {
  createPostsCategory,
};