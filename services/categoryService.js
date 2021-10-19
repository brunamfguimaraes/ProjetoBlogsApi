const Joi = require('joi');
const { Category } = require('../models');

  const createCategory = async (name) => {
    const schema = Joi.object({
      name: Joi.string().required(),
  }).validate({ name });
  console.log(name);
    if (schema.error) return { message: schema.error.message, status: 400 };
    const { id } = await Category.create({ name });
    return { id, name };
    };
      
  const getAllCategory = async () => Category.findAll();

  module.exports = { createCategory, getAllCategory };