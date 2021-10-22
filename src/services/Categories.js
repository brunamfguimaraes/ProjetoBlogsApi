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

const getCategoriesById = async (id) => {
  const categoryById = await Categories.findByPk(id);

  if (!categoryById) throw validateError(404, 'Category does not exist');

  return categoryById;
};

const updateCategory = async (id, name) => {
  const updatedCategory = await Categories.update({ name }, { where: { id } });

  return updatedCategory;
};

const deleteCategory = async (id) => {
  const deletedCategory = await Categories.destroy({ where: { id } });

  return deletedCategory;
};

module.exports = {
  createCategories,
  getAllCategories,
  getCategoriesById,
  updateCategory,
  deleteCategory,
};
