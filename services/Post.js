const Sequelize = require('sequelize');
const { BlogPosts, PostsCategories } = require('../models');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const create = async ({ title, content, categoryIds, userId }) => {
  const transaction = await sequelize.transaction();

  try {
    const post = await BlogPosts.create({ title, content, userId }, { transaction });
  
    await Promise.all(categoryIds.map((id) => (
      PostsCategories.create({ postId: post.id, categoryId: id }, { transaction }))));

    await transaction.commit();

    return post;
  } catch (error) {
    await transaction.rollback();
  
    return error;
  }
};

module.exports = {
  create,
};
