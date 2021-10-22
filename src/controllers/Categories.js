const service = require('../services/Categories');

const createCategories = async (req, res) => {
  try {
    const category = req.body;

    const newCategorie = await service.createCategories(category);

    return res.status(201).json(newCategorie);
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

const getCategoriesById = async (_req, _res) => {};

const updateCategory = async (_req, _res) => {};

const deleteCategory = async (_req, _res) => {};

module.exports = {
  createCategories,
  getAllCategories,
  getCategoriesById,
  updateCategory,
  deleteCategory,
};
