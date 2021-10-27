const { BlogPost, User, Category } = require('../models');

const getUserId = async (email) => {
  const { id } = await User.findOne({ email });

  return id;
};

const addPost = async (title, content, userId) => {
  const post = await BlogPost.create({ title, content, userId });

  return post;
};

const getAllPosts = async () => {
  const postsLists = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return postsLists;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne(
    { include: [{
      where: { id },
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }] },
  );

  if (!post) return null;

  return post;
};

module.exports = {
  addPost,
  getAllPosts,
  getUserId,
  getPostById,
};
