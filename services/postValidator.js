const Joi = require('joi');
const MyError = require('./errorClass');
const { BlogPost, Category } = require('../models');

async function bodyPostValidator(post) {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.required(),
  }).validate(post);

  if (error) throw new MyError(error.details[0].message, 400);
}

async function checkCategories(categoryIds) {
  const categories = await Category.findAll();
  const arrIds = categories.map((c) => c.id);

  const validCategories = categoryIds.every((categoryId) => arrIds.includes(categoryId));

  if (!validCategories) throw new MyError('"categoryIds" not found', 400);
  /*
    [ {id, name}, {id, name} ]
  */
}

module.exports = {
  bodyPostValidator,
  checkCategories,
};