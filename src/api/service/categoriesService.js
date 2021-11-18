const { Category } = require('../../models');
const { ApiError } = require('../utils/ApiError');

const createCatService = async (body) => {
  if (!body.name) {
    throw new ApiError('"name" is required', 400);
  }

  const category = await Category.create(body);
  return category;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  createCatService,
  getAllCategories,
};
