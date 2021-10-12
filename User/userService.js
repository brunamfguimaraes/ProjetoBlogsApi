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

const blankFieldsValidation = (fields = {}) => {
  const fieldsKeys = Object.keys(fields);
  const blankField = fieldsKeys.find((fieldKey) => fields[fieldKey] === '');
  if (blankField) {
    throw new RequestError('badRequest', `"${blankField}" is not allowed to be empty`);
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

const login = async ({ email, password }) => {
  requiredValidation({ email, password });
  blankFieldsValidation({ email, password });
  const user = await User.findOne({ where: { email, password } });

  if (!user) throw new RequestError('badRequest', 'Invalid fields');

  const { displayName, id } = user;
  const newToken = createToken({ id, displayName, email });
  return newToken;
};

const findById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) throw new RequestError('notFound', 'User does not exist');

  return user;
};

module.exports = {
  create,
  login,
  findById,
};
