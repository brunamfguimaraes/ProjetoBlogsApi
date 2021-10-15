const { Category } = require('../models');

const checkTitle = (req, res, next) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: '"title" is required' });
  next();
};

const checkContent = (req, res, next) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: '"content" is required' });
  next();
};

const checkCategoriesIds = (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });
  next();
};

const findCommonElments = (arr1, arr2) => arr1.some((el) => arr2.includes(el));
// https://www.geeksforgeeks.org/how-to-find-if-two-arrays-contain-any-common-item-in-javascript/

const checkIfCategoryExists = async (req, res, next) => {
  const existingCategories = await Category.findAll();
  const result = findCommonElments(req.body.categoryIds, JSON.stringify(existingCategories));
  if (result === false) return res.status(401).json({ message: '"categoryIds" not found' });
  next();
};

module.exports = {
  checkTitle,
  checkContent,
  checkCategoriesIds,
  checkIfCategoryExists,
};
