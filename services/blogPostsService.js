const { BlogPost, Category, User } = require('../models');

const validateExists = (title, content, categoryIds) => {
  if (!title) return { message: '"title" is required' };

  if (!content) return { message: '"content" is required' };

  if (!categoryIds) return { message: '"categoryIds" is required' };

  return false;
};

const categoryIdExists = async (categoryIds) => {
  const categoria = await Category.findAll({ where: { id: categoryIds } });

  if (categoria.length !== categoryIds.length) {
    return { message: '"categoryIds" not found' };
  }

  return categoria;
};

const createPost = async (userId, title, content, categoryIds) => {
  const validParams = validateExists(title, content, categoryIds);

  if (validParams.message) return validParams;

  const create = await BlogPost.create({ userId, title, content });
  return create;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

module.exports = {
  createPost,
  categoryIdExists,
  getAll,
};