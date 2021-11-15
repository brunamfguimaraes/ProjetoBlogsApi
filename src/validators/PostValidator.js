const joi = require('joi');
const { Category } = require('../../models');

const postValidator = (post) => {
  const { error } = joi.object({
    title: joi.string().not().empty()
    .required(),
    content: joi.string().not().empty()
    .required(),
    categoryIds: joi.array().not().empty()
    .required(),
    userId: joi.number(),
  }).validate(post);

  if (error) {
    return { message: error.details[0].message };
  }

  return {};
};

const categoryValidator = async (categories) => {
  const categoryCollection = categories.map(async (id) => Category.findByPk(id));
  const response = await Promise.all(categoryCollection);

  return response.some((category) => category === null);
};

const changeValidator = (updateEntries) => {
  const { error } = joi.object({
    title: joi.string().not().empty()
    .required(),
    content: joi.string().not().empty()
    .required(),
  }).validate(updateEntries);

  if (error) {
    return { message: error.details[0].message };
  }

  return {};
};

module.exports = {
  postValidator,
  categoryValidator,
  changeValidator,
};
