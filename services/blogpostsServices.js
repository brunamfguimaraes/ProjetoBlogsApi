const { BlogPost } = require('../models');
const { hasCategoryById } = require('./categoriesServices');
const {
  validateTitle,
  validateContent,
  validateCategory,
} = require('../validation/postValidation');

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

  const validatingCategory = validateCategory(categoryIds, async () => await hasCategories(categoryIds));
  if (validatingCategory.error) return validatingCategory;

  const newPost = await BlogPost.create(postData);
  return { ...newPost.dataValues };
};

module.exports = {
  createPost,
};