const { Category } = require('../models');

const categoryValidation = async (categoryIds) => {
  const checkCategories = await Promise.all(categoryIds
    .map((categoryId) => Category.findByPk(categoryId)));
  if (!checkCategories.every((category) => category !== null)) {
    return false;
  }
  return true;
};

const postValidations = async (req, _res, next) => {
  const { title, categoryIds, content } = req.body;
  if (!title) return next({ message: '"title" is required' });
  if (!categoryIds) return next({ message: '"categoryIds" is required' });
  if (!content) return next({ message: '"content" is required' });
  const verifyCategories = await categoryValidation(categoryIds);
  if (!verifyCategories) next({ message: '"categoryIds" not found' });
  next();
};

const updatePostValidations = async (req, _res, next) => {
  const { title, content, categoryIds } = req.body;
  if (categoryIds) return next({ message: 'Categories cannot be edited' });
  if (!title) return next({ message: '"title" is required' });
  if (!content) return next({ message: '"content" is required' });
  next();
};

module.exports = {
  postValidations,
  updatePostValidations,
};