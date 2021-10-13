const { requiredFields } = require('../validations');
const { Category } = require('../models');

const create = async (name) => {
  requiredFields({ name });
  const { id } = await Category.create({ name });
  return { id, name };
};

module.exports = {
  create,
};