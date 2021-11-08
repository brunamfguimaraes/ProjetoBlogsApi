const { BlogPost, Category, User } = require('../models');

const validateTitCont = (title, content) => {
  if (!title) {
    return { code: 400, message: '"title" is required' };
  }

  if (!content) {
    return { code: 400, message: '"content" is required' };
  }

  return true;
};

const validateCreatePost = async ({ title, content, userId, categoryIds }) => {
  const validTitleContCat = validateTitCont(title, content);
  if (validTitleContCat !== true) {
    return { code: validTitleContCat.code, message: validTitleContCat.message };
  }

  if (!categoryIds) {
    return { code: 400, message: '"categoryIds" is required' };
  }

  // Desenvolvido com ajuda de Felippe Correa
  const validNotCategory = await Category.findAll({ where: { id: categoryIds } });
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

const validateUpdatePost = async (idPost, { title, content }, idUser) => {
  const validFields = await validateTitCont(title, content);
  if (validFields !== true) {
    return { code: validFields.code, message: validFields.message };
  }

  const requestPostById = await validateFindPostById(idPost);
  console.log(requestPostById, idUser);
  if (requestPostById.userId !== idUser) {
    return { code: 401, message: 'Unauthorized user' };
  }

  await BlogPost.update({ title, content }, { where: { id: idPost } });

  const postAlreadyUpdate = await validateFindPostById(idPost);
  return postAlreadyUpdate;
};

  const validateDeletePost = async (idPost, idUser) => {
    const { code, message, userId } = await validateFindPostById(idPost);
    if (message) {
      return { code, message };
    }

    if (userId !== idUser) {
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