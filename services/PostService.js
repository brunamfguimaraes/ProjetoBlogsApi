const { Category, BlogPost } = require('../models');

const categoryExists = async (categoryIds) => {
  const allCategories = await Category.findAll({ raw: true, attributes: ['id'] });  
  const allIds = allCategories.map((categoryId) => categoryId.id);

  const isAllCategoryExists = categoryIds.every((categoryId) => allIds.includes(categoryId));

  if (!isAllCategoryExists) {
    return { isError: true, message: '"categoryIds" not found' };
  }

  return { isError: false, message: 'ok' };
};

const postExists = async (id) => {
  const isPostExists = await BlogPost.findByPk(id);
  
  if (!isPostExists) {
    return { isError: true, message: 'Post does not exist' };
  }

  return { isError: false, message: 'ok' };
};

module.exports = {
  categoryExists,
  postExists,
};