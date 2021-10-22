const Joi = require('@hapi/joi');
const validateError = require('../middleweres/validateError');

const { Categories } = require('../../models');

const CategorySchema = Joi.object({
  name: Joi.string().required(),
}).messages({
  'any.required': '{{#label}} is required',
  'string.empty': '{{#label}} is required',
});

const createCategories = async (category) => {
  // valida as informações do body
  const { error } = CategorySchema.validate(category);
  if (error) throw validateError(400, error.message);

  // cria uma nova categoria
  const newCategory = await Categories.create(category);
  return newCategory;
};

const getAllCategories = async () => {
  const allCategories = await Categories.findAll();

  return allCategories;
};

const getCategoriesById = async () => {};

const updateCategory = async () => {};

const deleteCategory = async () => {};

module.exports = {
  createCategories,
  getAllCategories,
  getCategoriesById,
  updateCategory,
  deleteCategory,
};
