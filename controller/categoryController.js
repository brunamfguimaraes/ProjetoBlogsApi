const categoryService = require('../services/categorieServices');
const codes = require('../middlewares/codes');

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await categoryService.createCategory(name);

    return res.status(codes.ok).json(category);
  } catch (error) {
    const { code, message } = error;
    return res.status(code).json({ message });
  }
};

module.exports = { createCategory };