const { createCategoryService, getAllCategorysService } = require('../service/categoryService');

const createCategory = async (req, res) => {
  const { body } = req;

  const category = await createCategoryService(body);
  if (category.message) return res.status(400).json({ message: category.message });

  return res.status(201).json(category);
};

const getAllCategorys = async (req, res) => {
  try { 
  const category = await getAllCategorysService();

  return res.status(200).json(category);
  } catch (err) {
    console.log(err);
  return res.status(500).json(err);
  }
};

module.exports = {
  createCategory,
  getAllCategorys,
};
