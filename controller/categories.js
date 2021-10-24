const rescue = require('express-rescue');
const { serviceCreateCategory, getAllCategories } = require('../service/serviceCategory');

const createCategory = rescue(async (req, res) => {
    const result = await serviceCreateCategory(req, res);
    res.status(201).json(result);
  });

const getAllCategoriesController = rescue(async (req, res) => {
  const result = await getAllCategories();
  res.status(200).json(result);
});

module.exports = { createCategory, getAllCategoriesController };
