const { Categories } = require('../models');
const isError = require('../utils/isError');
const { BAD_REQUEST } = require('../utils/statusCode');

const validatePost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title) {
    return isError(res, BAD_REQUEST, '"title" is required');
  }
  if (!content) {
    return isError(res, BAD_REQUEST, '"content" is required');
  }
  if (!categoryIds) {
    return isError(res, BAD_REQUEST, '"categoryIds" is required');
  }

  next();
};

const validateCategoryExists = async (req, res, next) => {
  const { categoryIds } = req.body;

  const category = await Promise.all(
    categoryIds.map(async (id) => {
      const isCategory = await Categories.findOne({ where: { id } });
      return isCategory !== null;
    }),
  );
    
  if (category.includes(false)) {
    return isError(res, BAD_REQUEST, '"categoryIds" not found');
  }

  next();
};

module.exports = {
  validatePost,
  validateCategoryExists,
};