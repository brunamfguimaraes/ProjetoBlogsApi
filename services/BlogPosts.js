const { BlogPost } = require('../models');

const addPost = async (title, content, userId) => {
  console.log(title, content, userId, 'addpost service');
  const post = await BlogPost.create({ title, content, userId });

  return post;
};

module.exports = {
  addPost,
};
