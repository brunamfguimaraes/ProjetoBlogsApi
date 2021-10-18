// const categoryService = require('../services/categoryService');

// const createCategory = async (req, res) => {
//   const { body } = req;
//   const result = await categoryService.createCategory(body.name);
//   if (result.message) return res.status(result.status).json({ message: result.message });
//   return res.status(201).json(result);
// };
// const getAllCategory = async (_req, res) => {
//   const categories = await categoryService.getAllCategory();
//   return res.status(200).json(categories);
// };

// module.exports = { createCategory, getAllCategory };