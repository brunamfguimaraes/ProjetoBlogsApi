const service = require('../services/Categories');

const createCategory = async (req, res) => {
  try {
    const category = req.body;

    const newCategory = await service.createCategory(category);

    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const allCategories = await service.getAllCategories();

    delete allCategories.createdAt;
    delete allCategories.updatedAt;

    return res.status(200).json(allCategories);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.body;

    const categoryById = await service.getCategoryById(id);

    return res.status(200).json(categoryById);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
};
