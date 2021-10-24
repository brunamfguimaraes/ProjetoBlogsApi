const { BlogPost, User, Category } = require('../models');

const addPost = async (title, content, userId) => {
  const post = await BlogPost.create({ title, content, userId });

  return post;
};

const getAllPosts = async () => {
  const postsLists = await BlogPost.findAll({
    include: [{
      model: User, as: 'user', attributes: { exclude: ['password'] },
    }],
  });
  // const categories = await Categories.findAll({ where});

  return postsLists;
};

module.exports = {
  addPost,
  getAllPosts,
};
