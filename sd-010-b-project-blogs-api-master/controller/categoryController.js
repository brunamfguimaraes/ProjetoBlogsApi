const { createCategoryService } = require('../service/categoryService');

const createCategory = async (req, res) => {
  const { body } = req;

  const category = await createCategoryService(body);
  if (category.message) return res.status(400).json({ message: category.message });

  return res.status(201).json(category);
};
module.exports = {
  createCategory,
};