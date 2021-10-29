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

// const validateIfPostExists = (id) => {
//   if (!id) {
//     return { code: 404, message: 'Post does not exist' };
//   }
// };

const validateUpdatePost = async (idPost, { title, content }, idUser) => {
  const validFields = await validateTitContCatId(title, content);
  if (validFields !== true) {
    return { code: validFields.code, message: validFields.message };
  }
  const requestPostById = validateFindPostById(idPost);
  if (requestPostById.userId !== idUser) {
    return { code: 401, message: 'Unauthorized user' };
  }
  await BlogPost.update({ title, content }, { where: { id: idPost } });
  const postAlreadyUpdate = validateFindPostById(idPost);
  return postAlreadyUpdate;
};

  const validateDeletePost = async (idPost, idUser) => {
    const requestPostById = validateFindPostById(idPost);
    console.log(requestPostById);
    if (!requestPostById) {
      return { code: 404, message: 'Post does not exist' };
    }
    if (requestPostById.userId !== idUser) {
      return { code: 401, message: 'Unauthorized user' };
    }
    const removed = await BlogPost.destroy({ where: { id: idPost } });
    return removed;
  };

module.exports = {
  validateCreatePost,
  validateFindPost,
  validateFindPostById,
  validateUpdatePost,
  validateDeletePost,
};