const { BAD_REQUEST } = require('http-status');
const { Category, BlogPost } = require('../models');
const ERROR_MESSAGE = require('./error');
const { getCategoryById } = require('./Category');

const checkCategories = async (categoryIds) => {
  const categoryExist = Promise.all(categoryIds.map((id) => getCategoryById(id)));
  return (await categoryExist)[0];
};

const checkCategoryId = (categoryIds) => {
  if (!categoryIds || categoryIds.length === 0) {
    return {
      err: {
        status: BAD_REQUEST,
        message: ERROR_MESSAGE.noId,
      },
    };
  }
  return true;
};

const checkTitle = (title) => {
  if (!title || title === '') {
    return {
      err: {
        status: BAD_REQUEST,
        message: ERROR_MESSAGE.noTitle,
      },
    };
  }
  return true;
};

const checkContent = (content) => {
  if (!content || content === '') {
    return {
      err: {
        status: BAD_REQUEST,
        message: ERROR_MESSAGE.noContent,
      },
    };
  }
  return true;
};

const createPostCategory = async (postId, categoryIds) => {
  const post = await BlogPost.findByPk(postId);

  categoryIds.forEach(async (categoryId) => {
    const categories = await Category.findByPk(categoryId);
    await post.addCategories(categories);
  });
};

const create = async ({ title, content, categoryIds }, { id: userId }) => {
  if (checkTitle(title).err) return checkTitle(title);
  if (checkContent(content).err) return checkContent(content);
  if (checkCategoryId(categoryIds).err) return checkCategoryId(categoryIds);

  const checkCategory = await checkCategories(categoryIds);
  if (checkCategory.err) return checkCategory;

  const { id } = await BlogPost.create({ userId, title, content });
  await createPostCategory(id, categoryIds);
  return { id, userId, title, content };
};

module.exports = {
  create,
};