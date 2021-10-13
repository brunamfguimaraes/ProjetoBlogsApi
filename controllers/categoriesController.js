const middlewares = require('../middlewares');
const { registerCategory, getAllCategories } = require('../services/categoryService');

const createCategory = async (req, res, next) => {
  const { error } = middlewares.validationCategory(req.body);
  if (error) return next(error);

  const newCategory = await registerCategory(req.body);
  return res.status(201).json(newCategory);
};

const getCategories = async (_req, res) => {
  try {
    const categories = await getAllCategories();
    return res.status(200).json(categories);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createCategory, 
  getCategories,
};