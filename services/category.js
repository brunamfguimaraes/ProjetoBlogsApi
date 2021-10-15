const { Category } = require('../models');

const createCategory = async (req, res) => {
  const newCategory = await Category.create(req.body);
  if (!newCategory) return res.status(400).json({ message: 'fail' });
  return res.status(201).json(newCategory);
};

const verifyCategory = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
};

const getAllCategories = async (req, res) => {
  const categories = await Category.findAll();
  // console.log(JSON.stringify(categories), 'get-cat');
  return res.status(200).json(categories);
};

module.exports = {
  createCategory,
  verifyCategory,
  getAllCategories,
};
