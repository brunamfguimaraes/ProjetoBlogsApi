const categoryServices = require('../services/categoryServices');

const createCategory = async (req, res, next) => {
  const { name } = req.body;
  const newCategory = await categoryServices.createCategory(name);
  if (newCategory.message) return next(newCategory);
  res.status(201).json(newCategory);
};

module.exports = {
  createCategory,
};