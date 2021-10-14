const { BlogPosts, Users } = require('../models');

const findUserByEmail = async (email) => {
  const { id } = await Users.findOne({ where: { email } });
  return id;
};

const createPost = async (title, content, categoryIds, userId) => {
  const published = Date.now();
  const { id } = await BlogPosts.create({ title, content, categoryIds, userId, published });
  return id;
};

module.exports = {
  createPost,
  findUserByEmail,
};
