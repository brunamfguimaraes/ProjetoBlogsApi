const { createCategory } = require('../services/categoryService');
const { Categories } = require('../models');

const category = async (req, res) => {
  const { name } = req.body;

  const create = await createCategory(name);
  if (create.error) return res.status(400).json({ message: create.err.message });
  
  const findCategory = await Categories.findOne({ where: { name } });
  return res.status(201).json(findCategory);
};

const allCategories = async (req, res) => {
  const categories = await Categories.findAll();
  return res.status(200).json(categories);
};

module.exports = {
  category,
  allCategories,
};