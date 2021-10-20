const { Op } = require('sequelize');
const { Category } = require('../models');

const createPost = async ({ _title, categoryIds, _content }) => {
  if (typeof categoryIds !== 'object') {
    return { message: 'Not a object', status: 400 };
  }
  const findCategory = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  if (findCategory.length === 0) {
    return { message: '"categoryIds" not found', status: 400 };
  }
};

module.exports = { createPost };