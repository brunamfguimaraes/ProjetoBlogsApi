const { BlogPosts } = require('../models');

const addPost = async (title, content, userId) => {
  console.log(title, content, userId, 'addpost service');
  const post = await BlogPosts.findAll();

  return post;
};

module.exports = {
  addPost,
};
