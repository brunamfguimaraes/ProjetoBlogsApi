const { BAD_REQUEST } = require('http-status');
const { Category } = require('../models');
const ERROR_MESSAGE = require('./error');

const validateCategory = (name) => {
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
  if (validateCategory(name).err) return validateCategory(name);

  const { id } = await Category.create({ name });

  return { id, name };
};

module.exports = { create };