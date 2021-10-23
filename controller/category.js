const { StatusCodes: {
  BAD_REQUEST, CREATED, OK } } = require('http-status-codes');

const { createCategory } = require('../services/category');
const { Categories } = require('../models');

const category = async (req, res) => {
  const { name } = req.body;

  const create = await createCategory(name);
  if (create.error) return res.status(BAD_REQUEST).json({ message: create.err.message });

  const findCategory = await Categories.findOne({ where: { name } });
  return res.status(CREATED).json(findCategory);
};

const allCategories = async (req, res) => {
  const categories = await Categories.findAll();
  return res.status(OK).json(categories);
};

module.exports = {
  category, allCategories,
};
