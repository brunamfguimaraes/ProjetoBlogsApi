const { Op } = require('sequelize');
const { Categorie } = require('../models');

const errors = {
  titleUndef: '"title" is required',
  contentUndef: '"content" is required',
  categoryUndef: '"categoryIds" is required',
  categoryNotFound: '"categoryIds" not found',
};

const badRequestStatus = 400;

const validateNewPost = (title, content, categoryIds) => {
  if (title === undefined) {
    return { err: { message: errors.titleUndef }, status: badRequestStatus };
  }
  if (content === undefined) {
    return { err: { message: errors.contentUndef }, status: badRequestStatus };
  }
  if (categoryIds === undefined) {
    return { err: { message: errors.categoryUndef }, status: badRequestStatus };
  }
  return {};
};

const validateCategories = async (categoryIds) => {
  try {
    const registeredCategories = await Categorie.findAll({ where: { id: {
      [Op.in]: categoryIds,
    } } });
    if (categoryIds.length !== registeredCategories.length) {
      return { err: { message: errors.categoryNotFound }, status: badRequestStatus };
    }
    return { registeredCategories };
  } catch (e) {
    console.log(e.message);
    return { err: { message: 'Algo deu errado' }, status: 500 };
  }
};

module.exports = {
  validateNewPost,
  validateCategories,
};