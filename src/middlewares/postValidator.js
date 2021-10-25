const Joi = require('@hapi/joi');
const { StatusCodes } = require('http-status-codes');
const Error = require('../helpers/errors');
const { Category } = require('../sequelize/models');

const postValidator = async (req, res, next) => {
  const { error } = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(req.body);

  const { code } = Error.badRequest();

  if (error) return res.status(code).json({ message: error.details[0].message });

  next();
};

const existsCategories = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categories = await Category.findAll({ where: { id: categoryIds } });
  if (categories.length !== categoryIds.length) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }

  next();
};

module.exports = {
  postValidator,
  existsCategories,
};
