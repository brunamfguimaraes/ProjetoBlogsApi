const status = require('http-status');
const { Category } = require('../models');
const categoryService = require('../services/categoryService');

const validName = async (req, res, next) => {
  const { name } = req.body;

  const isValidName = categoryService.isValidName(name);
  
  if (isValidName) {
    return res.status(status.BAD_REQUEST).json({ message: isValidName });
  }
    
  next();
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  
  const category = await Category.create({ name });
  return res.status(status.CREATED).json(category);
};

const findAllCategories = async (_req, res) => {  
  const categories = await Category.findAll();

  return res.status(status.OK).json(categories);
};

module.exports = { validName, createCategory, findAllCategories };