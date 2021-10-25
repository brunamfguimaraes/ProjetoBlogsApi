const { StatusCodes } = require('http-status-codes');
const { Category } = require('../models');

const validateCategory = async (req, res, next) => {
  const { categoryIds } = req.body;
  const getAllCategories = await Category.findAll();
  const getIds = getAllCategories.map((category) => category.id);
  const getAllIds = categoryIds.every((id) => getIds.includes(id));
  
  if (!getAllIds) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"categoryIds" not found',
    });
  }
  
  next();
};
module.exports = validateCategory;
