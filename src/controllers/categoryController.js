// require('dotenv').config();
const CategoryService = require('../services/categoryService');
const codes = require('../util/httpCodes');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await CategoryService.createCategory(name);

    return res.status(codes.created).json(category);
  } catch (err) {
    return next(err);
  }
};

const getCategories = async (_req, res, next) => {
  try {
    const categories = await CategoryService.getCategories();

    return res.status(codes.ok).json(categories);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  createCategory,
  getCategories,
};