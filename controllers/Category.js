const { CREATED, INTERNAL_SERVER_ERROR, OK } = require('http-status');
const { create, getAllCategories } = require('../services/Category');

const createCategory = async (req, res) => {
  try {
    const category = await create(req.body);
    if (category.err) {
      return res.status(category.err.status).json({ message: category.err.message });
    }
    res.status(CREATED).json(category);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const getCategories = async (_req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(OK).json(categories);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
};