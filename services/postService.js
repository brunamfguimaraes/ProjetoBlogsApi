const httpStatus = require('http-status');

const { BlogPost } = require('../models');
const validate = require('../utils/validation');

const createPost = async ({ title, content, categoryIds }, { id }) => {
  await validate.createPost(title, content, categoryIds);
  const data = await BlogPost.create({ userId: id, title, content, categoryIds })
    .then((post) => {
      post.addCategory(categoryIds);
      return ({ id: post.id, userId: post.userId, title: post.title, content: post.content });
    });
  return ({ status: httpStatus.CREATED, data });
};

module.exports = { createPost };
