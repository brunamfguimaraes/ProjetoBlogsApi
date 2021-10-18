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

module.exports = { createCategory };
