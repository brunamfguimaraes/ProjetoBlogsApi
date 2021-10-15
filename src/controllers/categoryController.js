const { StatusCodes } = require('http-status-codes');
const categoryService = require('../services/categoryService');

const postCategory = async (req, res) => {
  try {
    const category = await categoryService.newCategory(req.body);
    return res.status(StatusCodes.CREATED).json(category);
  } catch (e) {
    console.log(e.message);
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await categoryService.getAll();
  
    return res.status(StatusCodes.OK).json(categories);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: e.message });
  }
};

module.exports = { postCategory, getAll };
