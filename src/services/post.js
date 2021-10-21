const { BlogPosts } = require('../../models');

async function createPost(title, content) {
  const result = await BlogPosts.create({ title, content });
  return result;
}

module.exports = {
  createPost,
};
