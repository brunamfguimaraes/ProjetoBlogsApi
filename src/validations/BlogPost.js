const Joi = require('joi');
const { in: opIn } = require('sequelize').Op;

const blogBody = (bodyObj) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(bodyObj);

  if (error) throw error;
};

const checkCategoryIds = async (categoryIds, Model) => {
  const categories = await Model.findAll({ where: { id: { [opIn]: categoryIds } } });
  if (!categories.length) {
    const error = new Error('"categoryIds" not found');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  blogBody,
  checkCategoryIds,
};
