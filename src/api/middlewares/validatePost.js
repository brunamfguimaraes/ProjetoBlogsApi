const { ApiError } = require('../utils/ApiError');
const { Category } = require('../../models');

const checkCategories = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categories = await Category.findAll();

  const ids = [];

  for (let i = 0; i < categories.length; i += 1) {
    ids.push(categories[i].id);
  }

  const checkCat = categoryIds.every((el) => ids.includes(el));

  if (!checkCat) {
    return next(new ApiError('"categoryIds" not found', 400));
  }
  next();
};

const validatePostData = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title) {
    return next(new ApiError('"title" is required', 400));
  }

  if (!content) {
    return next(new ApiError('"content" is required', 400));
  }

  if (!categoryIds && req.method !== 'PUT') {
    return next(new ApiError('"categoryIds" is required', 400));
  }

  // return checkCategories(req, next);
  next();
};

module.exports = {
  validatePostData,
  checkCategories,
};
