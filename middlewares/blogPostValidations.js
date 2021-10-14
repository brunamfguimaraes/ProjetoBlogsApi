const Joi = require('joi');
const rescue = require('express-rescue');
const { Category } = require('../models');

const validBlogPost = rescue(async (req, _res, next) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).required(),
  }).validate(req.body);
  if (error) { return next(error); }
  return next();
});

const countCategories = async (categoryIds) => {
  const count = await Category.count({
    where: {
      id: categoryIds,
      },
  });
  return count;
};

const validCategoryIds = rescue(async (req, _res, next) => {
  const { categoryIds } = req.body;
  const count = await countCategories(categoryIds);
  if (count !== categoryIds.length) {
    return next({ status: 400, message: '"categoryIds" not found' });
  }
  next();
});

module.exports = {
  validBlogPost,
  validCategoryIds,
};