const Joi = require('joi');
const httpStatus = require('../httpStatus');

const CategoryService = require('../service/Categories');

const verifyPostTitle = (req, res, next) => {
  const { title } = req.body;
  const schema = Joi.object({
    title: Joi.string().required(),
  }).validate({ title });
  if (schema.error) {
    const { message } = schema.error;
    return res.status(httpStatus.badRequest).json({ message });
  }
  next();
};

const verifyPostContent = (req, res, next) => {
  const { content } = req.body;
  const schema = Joi.object({
    content: Joi.string().required(),
  }).validate({ content });
  if (schema.error) {
    const { message } = schema.error;
    return res.status(httpStatus.badRequest).json({ message });
  }
  next();
};

const verifyPostCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  const lastCategoryId = await CategoryService.getLastCategoryId();
  const schema = Joi.object({
    categoryIds: Joi.array().items(Joi.number().required()).required(),
  }).validate({ categoryIds });
  if (categoryIds && categoryIds.some((category) => category > lastCategoryId)) {
    return res.status(httpStatus.badRequest).json({ message: '"categoryIds" not found' });
  }

  if (schema.error) {
    const { message } = schema.error;
    return res.status(httpStatus.badRequest).json({ message });
  }
  next();
};

module.exports = {
  verifyPostTitle,
  verifyPostContent,
  verifyPostCategoryIds,
};
