const rescue = require('express-rescue');
const { Category } = require('../models');
const service = require('../services/categories');

const addCategory = rescue(async (req, res, next) => {
  const { name } = req.body;

  const validations = await service.addCategory(name);

  if ('code' in validations) {
    return next(validations);
  }

  const newCategory = await Category.create({ name });

  return res.status(201).json(newCategory);
});

const getAllCategories = rescue(async (req, res) => {
  const allCategories = await Category.findAll();

  return res.status(200).json(allCategories);
});

module.exports = { 
  addCategory,
  getAllCategories,
};