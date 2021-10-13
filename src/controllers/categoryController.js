const { INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST } = require('http-status');
const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
  
    const result = await categoryService.createCategory(name);
    if (result.message) return res.status(BAD_REQUEST).json(result);

    return res.status(CREATED).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
};