const Joi = require('joi');
const { ApiError } = require('../utils/ApiError');
const { Category } = require('../../models');

const validatePostData = async (body) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.required(),
  }).validate(body);
  if (error) {
    throw new ApiError(error.details[0].message, 400);
  }
};

const validatePostUpdate = async (body) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).validate(body);
  if (error) {
    throw new ApiError(error.details[0].message, 400);
  }
};

const checkCategories = async (categoryIds) => {
  const categories = await Category.findAll();

  const ids = [];

  for (let i = 0; i < categories.length; i += 1) {
    ids.push(categories[i].id);
  }

  const checkCat = categoryIds.every((el) => ids.includes(el));

  if (!checkCat) {
    throw new ApiError('"categoryIds" not found', 400);
  }
  return true;
};

module.exports = {
  validatePostData,
  checkCategories,
  validatePostUpdate,
};
