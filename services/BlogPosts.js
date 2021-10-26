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

module.exports = {
  addPost,
  getAllPosts,
  getUserId,
};
