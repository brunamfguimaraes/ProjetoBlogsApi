const { BlogPost } = require('../models');
const { bodyPostValidator, checkCategories } = require('./postValidator');
const MyError = require('./errorClass');

async function createPost(post, user) {
  await bodyPostValidator(post);
  await checkCategories(post.categoryIds);
  const result = await BlogPost.create({
    title: post.title,
    content: post.content,
    userId: user.id,
    published: Date.now(),
    updated: Date.now(),
  });
  return result;
}

module.exports = {
  createPost,
};