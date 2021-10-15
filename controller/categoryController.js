const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { body } = req;
  // console.log(body);
  const result = await categoryService.createCategory(body.name);
  if (result.message) return res.status(result.status).json({ message: result.message });
  res.status(201).json(result);
};
const getAllCategory = async (_req, res) => {
  const categories = await categoryService.getAllCategory();
  res.status(200).json(categories);
};

module.exports = { createCategory, getAllCategory };