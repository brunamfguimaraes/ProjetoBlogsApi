const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const create = await categoryService.createCategory(name);

  if (create.message) {
    return res.status(create.status).json({ message: create.message });
  }

  return res.status(201).json(create);
};

const getAllCategories = async (req, res) => {
  const getAll = await categoryService.getAllCategories();

  return res.status(200).json(getAll);
};

module.exports = {
  createCategory,
  getAllCategories,
};