const { StatusCodes } = require('http-status-codes');

const CategoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  
  const { id } = await CategoryService.createCategory(name);

  // if (newUser.Error) return res.status(newUser.code).json({ message: newUser.message });

  res.status(StatusCodes.CREATED).json({ id, name });
};

const getAll = async (req, res) => {
  const allCategories = await CategoryService.getAll();

  res.status(StatusCodes.OK).json(allCategories);
};

module.exports = {
  createCategory,
  getAll,
};
