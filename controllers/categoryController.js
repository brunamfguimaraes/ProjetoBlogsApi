const statusCode = require('http-status-codes');
const { Category } = require('../models');
const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = await categoryService.createCategory({ name }); 

  if (category.message) {
      return res.status(statusCode.BAD_REQUEST).json({ message: category.message });
  }
  
  return res.status(statusCode.CREATED).json(category);
};

const getAll = async (req, res) => {
  const category = await Category.findAll();
  res.status(statusCode.OK).json(category);
};

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findByPk(id);
//   if (!user) {
//     return res.status(statusCode.NOT_FOUND).json({
//     message: 'User does not exist',
//     });
//   }
//   res.status(statusCode.OK).json(user);
// };

module.exports = {
  createCategory,
  getAll,
};
