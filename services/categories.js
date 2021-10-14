const { Category } = require('../models');

const createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    
    res.status(201).json(newCategory);
    next();
  } catch (error) {
    return { message: 'erro' };
  }
};

const verifyCategory = (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: '"name" is required' });
    }
    next();
  } catch (error) {
    return { message: '"name" is required' };
  }
};

const getAllCategories = async (req, res) => {
  const allCategories = await Category.findAll();
  res.status(200).json(allCategories);
};

module.exports = { verifyCategory,
  createCategory,
  getAllCategories,
};