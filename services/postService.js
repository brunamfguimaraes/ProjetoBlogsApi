const { BlogPost, Category, User } = require('../models');

const validateTitContCatId = (title, content) => {
  if (!title) {
    return { code: 400, message: '"title" is required' };
  }
  if (!content) {
    return { code: 400, message: '"content" is required' };
  }
  return true;
};

const validateCreatePost = async ({ title, content, userId, categoryIds }) => {
  const validTitleContCat = validateTitContCatId(title, content);
  if (validTitleContCat !== true) {
    return { code: validTitleContCat.code, message: validTitleContCat.message };
  }
  if (!categoryIds) {
    return { code: 400, message: '"categoryIds" is required' };
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

const validateFindPostById = async (id) => {
  const findPostById = await BlogPost.findByPk(id, {
    include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } }], 
});
  if (!findPostById) {
    return { code: 404, message: 'Post does not exist' };
  }
  return findPostById;
};

const validateUpdatePost = async ({ id, title, content }) => BlogPost.update(
  { title, content },
  { where: { id } },
  ).then(async () => {
      const update = await BlogPost.findOne({ 
        where: { id },
        include: [
          { model: Category, as: 'categories' },
      ] });
      return update;
  });

  const validateDeletePost = (id) => {
    BlogPost.destroy({ where: { id } });
  };

module.exports = {
  validateCreatePost,
  validateFindPost,
  validateFindPostById,
  validateUpdatePost,
  validateDeletePost,
};