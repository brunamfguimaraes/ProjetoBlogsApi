const { listPosts } = require('../../repositories/postRepository');

const validateAuth = require('../../../../middlewares/validateAuth');

const list = async (auth) => {
  await validateAuth(auth);

  const post = await listPosts();

  return post;
};

module.exports = list;