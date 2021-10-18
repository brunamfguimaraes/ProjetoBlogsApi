const { StatusCodes } = require('http-status-codes');
const service = require('../services/categoryService');
require('dotenv').config();

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await service.createCategory({ name });
    return res.status(StatusCodes.CREATED).json(newCategory);
  } catch (error) {
    console.log(error);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
    }
    const getAll = await service.getAllCategories();
    return res.status(StatusCodes.OK).json(getAll);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
