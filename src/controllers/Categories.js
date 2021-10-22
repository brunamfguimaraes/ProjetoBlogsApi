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

const getCategoriesById = async (req, res) => {
  try {
    const { id } = req.body;

    const categoryById = await service.getCategoriesById(id);

    return res.status(200).json(categoryById);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await service.updateCategory(id, name);

    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await service.deleteCategory(id);

    return res.status(204).end();
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
};

module.exports = {
  createCategories,
  getAllCategories,
  getCategoriesById,
  updateCategory,
  deleteCategory,
};
