const { BlogPosts } = require('../../models');

async function createPost(title, content, userId) {
  const result = await BlogPosts.create({ title, content, userId });
  return result;
}

module.exports = {
  createPost,
};
