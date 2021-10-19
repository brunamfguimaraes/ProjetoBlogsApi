const Sequelize = require('sequelize');
const { BlogPosts, PostsCategories, Categories, User } = require('../models');
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

const findAll = async () => {
  const posts = await BlogPosts.findAll({
    include: [{ model: User, as: 'user' },
    { model: Categories, as: 'categories', through: { attributes: [] } }],
  });

  return posts;
};

const findByPk = async ({ id }) => {
  try {
    const post = await BlogPosts.findByPk(id, {
      include: [{ model: User, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } }],
    });

    return post;
  } catch (error) {
    return error;
  }
};

const update = async ({ id }, { title, content }) => {
  try {
    await BlogPosts.update({ title, content }, { where: { id } });

    const post = await BlogPosts.findByPk(id, {
      include: [
        { model: Categories, as: 'categories', through: { attributes: [] } }],
    });

    return post;
  } catch (error) {
    return error;
  }
};

module.exports = {
  create,
  findAll,
  findByPk,
  update,
};
