const { StatusCodes } = require('http-status-codes');
const categoryService = require('../services/categoryService');

const postCategory = async (req, res) => {
  try {
    const category = await categoryService(req.body);
    return res.status(StatusCodes.CREATED).json(category);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = postCategory;
