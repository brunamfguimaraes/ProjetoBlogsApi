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

module.exports = { createCategory };