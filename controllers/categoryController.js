const { StatusCodes } = require('http-status-codes');
const { postCategoryService } = require('../services');

const postCategoryController = async (req, res, next) => { 
  const { name } = req.body;
  
  const postCategory = await postCategoryService(name);
  if (postCategory.message) {
    return next(postCategory);
  }

  res.status(StatusCodes.CREATED).json(postCategory);
};

module.exports = { postCategoryController };
