const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');
const { hasCategoryById } = require('./categoriesServices');

const {
  validateTitle,
  validateContent,
  validateCategory,
} = require('../validation/postValidation');

const { 
  CANNOT_EDIT_CATEGORIES, 
} = require('../helper/errorObjects');

const { dataNotFound } = require('../helper/errorFunctions');

// ----------------------------------------------------------

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

  if (!post) return dataNotFound('Post');

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

const searchPosts = async (query) => {
  if (!query) {
    const allPosts = await getAllPosts();
    return allPosts;
  }
  
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
};