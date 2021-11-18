const httpStatus = require('http-status');

const { Category } = require('../models');
const validate = require('../utils/validation');

const createCategorie = async ({ name }) => {
  validate.createCategorie(name);
  const data = await Category.create({ name });
  return ({ status: httpStatus.CREATED, data });
};

module.exports = { createCategorie };
