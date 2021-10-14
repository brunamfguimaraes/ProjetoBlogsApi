const Joi = require('joi');
const { Category } = require('../models');

const validationCategory = (body) => 
  Joi.object({
    name: Joi.required(),
  }).validate(body);

const existsCategory = async (categories) => {
  const findCategory = await Category.findAll({ where: { id: categories } });
  
  if (findCategory.length === 0) {
    const err = new Error('"categoryIds" not found');
    err.statusCode = 400;
    return err;
  }
};

module.exports = {
  validationCategory,
  existsCategory,
};