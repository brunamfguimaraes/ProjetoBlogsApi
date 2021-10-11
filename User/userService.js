const { User } = require('../models');
const createToken = require('../auth/createToken');

const RequestError = require('../helper/customErrors');

const requiredValidation = (fields = {}) => {
  const fieldsKeys = Object.keys(fields);
  const invalidField = fieldsKeys.find((fieldKey) => fields[fieldKey] === undefined);
  if (invalidField) throw new RequestError('badRequest', `"${invalidField}" is required`);
};

const validateEmail = (email) => {
  const isValid = /\w+@\w+/g.test(email);
  if (!isValid) {
    throw new RequestError('badRequest', '"email" must be a valid email');
  }
};

const minLengthValidationName = (field = { fieldName: '', minLength: 0 }) => {
  let message = '';

  const [fieldKey, minLengthRequired] = Object.keys(field);
  if (!message && field[fieldKey].length < field[minLengthRequired]) { 
    message = `"${fieldKey}" length must be at least ${field[minLengthRequired]} characters long`; 
  }

  if (message) {
    throw new RequestError('badRequest', message);
  }
};

const minLengthValidationPassword = (field = { fieldName: '', minLength: 0 }) => {
  let message = '';

  const [fieldKey, minLengthRequired] = Object.keys(field);
  if (!message && field[fieldKey].length < field[minLengthRequired]) { 
    message = `"${fieldKey}" length must be ${field[minLengthRequired]} characters long`; 
  }

  if (message) {
    throw new RequestError('badRequest', message);
  }
};

const create = async ({ displayName, email, password, image }) => {
  requiredValidation({ displayName, email, password });
  validateEmail(email);
  minLengthValidationName({ displayName, minLength: 8 });
  minLengthValidationPassword({ password, minLength: 6 });
  const { id } = await User.create({ displayName, email, password, image });
  const newToken = createToken({ id, displayName, email });
  return newToken;
};

module.exports = {
  create,
};
