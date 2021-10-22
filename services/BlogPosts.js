const { BlogPost, User, Categories } = require('../models');

const addPost = async (title, content, userId) => {
  const post = await BlogPost.create({ title, content, userId });

  return post;
};

const getAllPosts = async (userId) => {
  console.log(userId);
  const postsLists = await BlogPost.findAll();
  const user = await User.findOne({ where: { id: userId } });
  // const categories = await Categories.findAll({ where});

  return [postsLists, user];
};

module.exports = {
  addPost,
  getAllPosts,
};
