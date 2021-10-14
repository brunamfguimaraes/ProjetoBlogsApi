const categoriesService = require('../services/categoriesService');
const { CREATED } = require('./msgStatus');

const createCategory = async (req, res) => {
  const newCategory = req.body;
  const category = await categoriesService.createCategory(newCategory);
  return res.status(CREATED).json(category);
};

module.exports = {
  createCategory,
};
