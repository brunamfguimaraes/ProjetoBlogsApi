const Joi = require('joi');
const { Categories } = require('../models');

const isValid = (name) => {
  const user = Joi.object({
      name: Joi.string().required(),
  });  
  const { error } = user.validate({ name });
  if (error) return { message: error.details[0].message };
};

const createCategory = async (name) => {
  const err = await isValid(name);
  if (err) return { err, error: true };

  const category = await Categories.create({ name });
  return category;
};

module.exports = { createCategory };