const { StatusCodes } = require('http-status-codes');
const { postCategoryService, getCategoriesService } = require('../services');

const postCategoryController = async (req, res, next) => { 
  const { name } = req.body;
  
  const postCategory = await postCategoryService(name);
  if (postCategory.message) {
    return next(postCategory);
  }

  res.status(StatusCodes.CREATED).json(postCategory);
};

const getCategoriesController = async (_req, res, _next) => { 
  const allCategories = await getCategoriesService();

  return res.status(StatusCodes.OK).json(allCategories);
};

module.exports = { postCategoryController, getCategoriesController };
