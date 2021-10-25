const {
  validateCreateCategory,
  validateFindCategories,
} = require('../services/categoryService');
require('dotenv').config();

const createCategory = async (req, res) => {
  const { name } = req.body;
  const create = await validateCreateCategory({ name });
  const { code, message } = create;
  if (message) {
    res.status(code).json({ message });
  }
  res.status(201).json(create);
};

const findCategories = async (_req, res) => {
  const find = await validateFindCategories();
  res.status(200).json(find);
};

module.exports = {
  createCategory,
  findCategories,
};
