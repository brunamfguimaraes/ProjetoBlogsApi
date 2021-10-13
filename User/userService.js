const { User } = require('../models');
const createToken = require('../auth/createToken');
const { requiredFields, validateEmail, validateDisplayNameMinLength, 
  validatePasswordMinLength, blankFields } = require('../validations');
const RequestError = require('../helper/customErrors');

const create = async ({ displayName, email, password, image }) => {
  requiredFields({ displayName, email, password });
  validateEmail(email);
  validateDisplayNameMinLength({ displayName, minLength: 8 });
  validatePasswordMinLength({ password, minLength: 6 });
  const { id } = await User.create({ displayName, email, password, image });
  const newToken = createToken({ id, displayName, email });
  return newToken;
};

const login = async ({ email, password }) => {
  requiredFields({ email, password });
  blankFields({ email, password });
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
