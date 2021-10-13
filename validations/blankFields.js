const RequestError = require('../helper/customErrors');

module.exports = (fields = {}) => {
  const fieldsKeys = Object.keys(fields);
  const blankField = fieldsKeys.find((fieldKey) => fields[fieldKey] === '');
  if (blankField) {
    throw new RequestError('badRequest', `"${blankField}" is not allowed to be empty`);
  }
};