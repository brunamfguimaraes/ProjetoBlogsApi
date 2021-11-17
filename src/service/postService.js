const Sequelize = require('sequelize');
const { BlogPost } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const createNewPost = async (title, content, categoryIds) => {
  const newPost = await sequelize.transaction(async (t) => {
    const post = await BlogPost.create({ title, content, categoryIds }, 
      { transaction: t });

    return post;
  });

  return newPost;
};

module.exports = {
  createNewPost,
};
