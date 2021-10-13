const RequestError = require('../helper/customErrors');
const { Category } = require('../models');

const create = async (name) => {
  requiredValidation({ name });
  const { id } = await Category.create({ name });
  return { id, name };
};

module.exports = {
  create,
};