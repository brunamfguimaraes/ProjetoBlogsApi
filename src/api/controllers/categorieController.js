const rescue = require('express-rescue');
const {
  createCatService,
  getAllCategories,
} = require('../service/categoriesService');

const createCategory = rescue(async (req, res) => {
  const { name } = req.body;
  const category = await createCatService(req.body);
  return res.status(201).json({ id: category.id, name });
});

const getCategories = rescue(async (req, res) => {
  const categories = await getAllCategories();
  return res.status(200).json(categories);
});

module.exports = {
  createCategory,
  getCategories,
};
