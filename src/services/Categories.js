const Joi = require('@hapi/joi');
const validateError = require('../middleweres/validateError');

const { Category } = require('../../models');

const CategorySchema = Joi.object({
  name: Joi.string().required(),
}).messages({
  'any.required': '{{#label}} is required',
  'string.empty': '{{#label}} is required',
});

const createCategory = async (bodyCategory) => {
  // valida as informações do body
  const { error } = CategorySchema.validate(bodyCategory);
  if (error) throw validateError(400, error.message);

  // cria uma nova categoria
  const newCategory = await Category.create(bodyCategory);
  return newCategory;
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll();

  return allCategories;
};

const getCategoryById = async (id) => {
  const categoryById = await Category.findByPk(id);

  if (!categoryById) throw validateError(404, 'Category does not exist');

  return categoryById;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
};
