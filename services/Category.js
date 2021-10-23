const { BAD_REQUEST } = require('http-status');
const { Category } = require('../models');
const ERROR_MESSAGE = require('./error');

const checkCategory = (name) => {
  if (!name || name === '') {
    return {
      err: {
        status: BAD_REQUEST,
        message: ERROR_MESSAGE.nameNull,
      },
    };
  }
  return true;
};

const create = async ({ name }) => {
  if (checkCategory(name).err) return checkCategory(name);

  const { id } = await Category.create({ name });

  return { id, name };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getCategoryById = async (id) => {
  const category = await Category.findByPk(id);
  if (category === null) {
    return { err: {
      status: BAD_REQUEST,
      message: ERROR_MESSAGE.noCategory,
    } };
  }
  return true;
};

module.exports = { create, getAllCategories, getCategoryById };