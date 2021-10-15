const categoryService = require('../services/categoryServices');
const codes = require('../middlewares/codes');

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await categoryService.createCategory(name);

    return res.status(codes.created).json(category);
  } catch (error) {
    const { code, message } = error;
    return res.status(code).json({ message });
  }
};

const getCategories = async (_req, res) => {
  try {
      const categories = await categoryService.getCategories();
      return res.status(codes.ok).json(categories);
  } catch (error) {
    const { code, message } = error;
      return res.status(code).json({ message });
  }
};

module.exports = { createCategory, getCategories };