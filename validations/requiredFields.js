const RequestError = require('../helper/customErrors');

module.exports = (fields = {}) => {
  const fieldsKeys = Object.keys(fields);
  const invalidField = fieldsKeys.find((fieldKey) => fields[fieldKey] === undefined);
  if (invalidField) throw new RequestError('badRequest', `"${invalidField}" is required`);
};