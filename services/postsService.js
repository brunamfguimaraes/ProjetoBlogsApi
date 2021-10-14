const { Post } = require('../models');

const createNewPost = async (title, content, userId) => {
  const post = await Post.create({ title, content, userId });
  const { id } = post;
  return id;
};

module.exports = { createNewPost };
