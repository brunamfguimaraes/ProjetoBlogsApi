const { BlogPost } = require('../models');

const createPost = async (title, content, categoryIds, userId) => {
  const post = await BlogPost.create({ title, content, categoryIds, userId });
  // console.log('=========', post);
  return post;
};

module.exports = {
  createPost,
};
