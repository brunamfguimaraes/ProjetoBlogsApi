const { BlogPost, Users, Categories } = require('../models');

const postNewPost = async ({ userId, title, content }) => {
  const result = await BlogPost.create({ userId, title, content });

  return result;
};

const getAllPosts = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: Users, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } },
  ],
  });

  return result;
};

const getByIdPosts = async (id) => {
  const result = await BlogPost.findByPk(id, {
    include: [
      { model: Users, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } },
  ],
  });

  return result;
};

module.exports = {
  postNewPost,
  getAllPosts,
  getByIdPosts,
};
