const categoriesServices = require('../services/categoriesServices');

const createCategory = async (req, res, next) => {
  try {
    const newCategory = await categoriesServices.createCategory(req.body);
    if (newCategory.error) next(newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    next(500);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const users = await categoriesServices.getAllCategories();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(500);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};

// getAll - OK
// create - OK
