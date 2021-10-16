const Joi = require('joi');
const rescue = require('express-rescue');
const { Category } = require('../models');

const validateFildsBlogPost = rescue(async (req, res, next) => {
  const { error } = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).required(),

  }).validate(req.body);
  if (error) {
    next(error);
  }
  next();
});

const validateCategory = rescue(async (req, res, next) => {
  const { categoryIds } = req.body;
  const findAllCategories = await Category.findAll().then((e) => e
  .map(({ dataValues }) => dataValues.id));

  const check = categoryIds.some((e, i) => findAllCategories[i] === e);
  if (!check) {
    next('categoryNotFound');
  }
  next();
});

module.exports = { validateFildsBlogPost, validateCategory };