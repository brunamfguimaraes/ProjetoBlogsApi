const RequestError = require('../helper/customErrors');
const { Category } = require('../models');

const requiredValidation = (fields = {}) => {
  const fieldsKeys = Object.keys(fields);
  const invalidField = fieldsKeys.find((fieldKey) => fields[fieldKey] === undefined);
  if (invalidField) throw new RequestError('badRequest', `"${invalidField}" is required`);
};

const create = async (name) => {
  requiredValidation({ name });
  const { id } = await Category.create({ name });
  return { id, name };
};

module.exports = {
  create,
};