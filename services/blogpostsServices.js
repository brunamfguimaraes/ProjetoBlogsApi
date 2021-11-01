const { BlogPost, User, Category } = require('../models');
const { hasCategoryById } = require('./categoriesServices');
const {
  validateTitle,
  validateContent,
  validateCategory,
} = require('../validation/postValidation');

const POST_NOT_FOUND = {
  error: {
    status: 404,
    message: 'Post does not exist',
  },
};

const CANNOT_EDIT_CATEGORIES = {
  error: {
    status: 400,
    message: 'Categories cannot be edited',
  },
};

const hasCategories = (categories) => {
  const arrayOfPromises = categories.map((category) => hasCategoryById(category));
  const isAllCategoriesValid = Promise.all(arrayOfPromises).then(
    (arrayOfResults) => arrayOfResults.every((result) => result),
  );
  return isAllCategoriesValid;
};

const createPost = async (postData) => {
  const { title, content, categoryIds } = postData;

  const validatingTitle = validateTitle(title);
  if (validatingTitle.error) return validatingTitle;

  const validatingContent = validateContent(content);
  if (validatingContent.error) return validatingContent;

  const validatingCategory = await validateCategory(categoryIds, () => hasCategories(categoryIds));
  if (validatingCategory.error) return validatingCategory;

  const newPost = await BlogPost.create(postData);
  return { ...newPost.dataValues };
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return POST_NOT_FOUND;

  return post;
};

const findUpdatedPosts = async (paramId) => {
  const foundUpdatedPost = await BlogPost.findOne({
    where: { id: paramId },
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return foundUpdatedPost;
};

const updatePost = async (postData) => {
  const { paramsId, title, content, categoryIds } = postData;

  if (categoryIds) return CANNOT_EDIT_CATEGORIES; 

  const validatingTitle = validateTitle(title);
  if (validatingTitle.error) return validatingTitle;

  const validatingContent = validateContent(content);
  if (validatingContent.error) return validatingContent;

  await BlogPost.update(
    { title, content },
    { where: { id: paramsId } },
  );
  
  const foundUpdatedPost = await findUpdatedPosts(paramsId);
  return foundUpdatedPost;
};

const deletePost = async (id) => { await BlogPost.destroy({ where: { id } }); };

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};