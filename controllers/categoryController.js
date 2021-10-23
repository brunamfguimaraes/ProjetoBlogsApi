const { StatusCodes } = require('http-status-codes');
const {
  createCategoryServices,
  getAllCategoriesServices, 
} = require('../services/categoryServices');

const createCategory = async (req, res) => {
  try {
    const response = await createCategoryServices(req.body.name);
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const response = await getAllCategoriesServices();
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = { createCategory, getAllCategories };