const { StatusCodes } = require('http-status-codes');

const CategoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  
  const { id } = await CategoryService.createCategory(name);

  // if (newUser.Error) return res.status(newUser.code).json({ message: newUser.message });

  res.status(StatusCodes.CREATED).json({ id, name });
};

module.exports = {
  createCategory,
};
