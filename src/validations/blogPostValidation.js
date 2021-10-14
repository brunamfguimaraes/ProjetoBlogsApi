const Joi = require('joi');

const { Category } = require('../models');

const checkPostEntries = (postData) => {
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    categoryIds: Joi.array().not().empty().required(),
    userId: Joi.number(),
  }).validate(postData);

  if (error) {
    return { message: error.details[0].message };
  }
  return {};
};

const checkCategories = async (categoriesIds) => {
  const arr = categoriesIds.map(async (id) => Category.findByPk(id));
  const resolvedArr = await Promise.all(arr);

  return resolvedArr.some((el) => el === null);
};

module.exports = {
  checkPostEntries,
  checkCategories,
};