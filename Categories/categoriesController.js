const rescue = require('express-rescue');
const service = require('./categoriesService');
const { Category } = require('../models');

const create = rescue(async (req, res) => {
  const { name } = req.body;
  const newCategory = await service.create(name);
  res.status(201).json(newCategory);
});

const getAll = rescue(async (_req, res) => {
  const categories = await Category.findAll();
  res.status(200).json(categories);
});

module.exports = {
  create,
  getAll,
};
