const { BlogPost } = require('../models');

const EmptyFields = (field) => {
  if (field) {
  const err = { name: 'emptyError',
  message: `"${field}" is required` };
  throw err;
  }
  return false;
};

const createNewPost = async (title, content, userId) => {
  const post = await BlogPost.create({ title, content, userId });
  const { id } = post;
  return id;
};

module.exports = { createNewPost };
