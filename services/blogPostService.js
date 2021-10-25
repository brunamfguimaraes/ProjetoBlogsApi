const { BlogPost, Category } = require('../models');

const create = async (title, content, userId, categoryIds) => {
  if (!title) return { erro: { code: 400, message: '"title" is required' } };
  if (!content) return { erro: { code: 400, message: '"content" is required' } };
  if (!categoryIds) return { erro: { code: 400, message: '"categoryIds" is required' } };

  const categories = await Category.findAll({ where: { id: categoryIds } });
  if (categories.length !== categoryIds.length) {
    return { erro: { code: 400, message: '"categoryIds" not found' } };
  }

  return BlogPost.create({ title, content, userId });
};

module.exports = { create };
