const Joi = require('joi');
const { Categories } = require('../models');

const validateName = (name) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
  }).validate(name);

  return error;
};

const createCategory = async (categoryInfo) => {
  const invalidName = validateName(categoryInfo);

  if (invalidName) return { error: invalidName };

  const category = await Categories.create(categoryInfo);

  return category;
};

const findCategories = async () => Categories.findAll();
const findCategory = async (id) => Categories.findOne({ where: { id } });

module.exports = { createCategory, findCategories, findCategory };