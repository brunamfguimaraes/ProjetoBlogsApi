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

module.exports = { 
  addCategory,
};