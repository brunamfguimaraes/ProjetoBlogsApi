const { BlogPost, Category, User } = require('../models');

const validateTitContCatId = (title, content, categoryIds) => {
  if (!title) {
    return { code: 400, message: '"title" is required' };
  }
  if (!content) {
    return { code: 400, message: '"content" is required' };
  }
  if (!categoryIds) {
    return { code: 400, message: '"categoryIds" is required' };
  }
  return true;
};

const validateCreatePost = async ({ title, content, userId, categoryIds }) => {
  const validTitleContCat = validateTitContCatId(title, content, categoryIds);
  if (validTitleContCat !== true) {
    return { code: validTitleContCat.code, message: validTitleContCat.message };
  }
  const validNotCategory = await Category.findAll({ where: { id: categoryIds } });
  // Desenvolvido com ajuda de Felippe Correa
  if (validNotCategory.length !== categoryIds.length) {
    return { code: 400, message: '"categoryIds" not found' };
  }
  const createPost = await BlogPost.create({ title, content, userId });
  return createPost;
};

const validateFindPost = async () => {
  const findPost = await BlogPost.findAll({
    include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } }], 
});
  return findPost;
};

module.exports = {
  validateCreatePost,
  validateFindPost,
};