const { Op } = require('sequelize');
const { Category, BlogPost, User } = require('../models');

const createPost = async ({ _title, categoryIds, _content }) => {
  if (typeof categoryIds !== 'object') {
    return { message: 'Not a object', status: 400 };
  }
  const findCategory = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  if (findCategory.length === 0) {
    return { message: '"categoryIds" not found', status: 400 };
  }
};

const getAllPosts = async () => {
  const getAll = await BlogPost.findAll({ include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
  return getAll;
};

module.exports = { 
  createPost,
  getAllPosts,
};