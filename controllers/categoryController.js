const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const create = await categoryService.createCategory(name);

  if (create.message) {
    return res.status(create.status).json({ message: create.message });
  }

  return res.status(201).json(create);
};

module.exports = {
  createCategory,
};