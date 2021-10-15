const rescue = require('express-rescue');
const Joi = require('joi');
const { PostsCategorie } = require('../models');

const validPost = rescue(async (req, _res, next) => {
   const { error } = Joi.object({
      title: Joi.string().required(),
      categoryIds: Joi.array().items(Joi.number()).required(),
      content: Joi.string().required(),
   }).validate(req.body);
   if (error) {
      return next(error);
   }
   return next();
});

const validCategoryIds = rescue(async (req, _res, next) => {
  const { categoryIds } = req.body;

  categoryIds.map(async (categoryId) => {
    const result = await PostsCategorie.findOne({ where: { categoryId } });
    if (!result) {
      return next({ status: 400, message: '"categoryIds" not found' });
    }
  });

  return next();
});

module.exports = { validPost, validCategoryIds };
