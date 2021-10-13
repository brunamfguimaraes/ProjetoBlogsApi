const middlewares = require('../middlewares');
const { registerCategory } = require('../services/categoryService');

const createCategory = async (req, res, next) => {
  const { error } = middlewares.validationCategory(req.body);
  if (error) return next(error);

  const newCategory = await registerCategory(req.body);
  return res.status(201).json(newCategory);
};

// const getCategories = async () => {
  
// };

module.exports = {
  createCategory, 
  // getCategories,
};