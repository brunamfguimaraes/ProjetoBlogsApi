// const { User } = require('../models');
const { validateEmail, findUser } = require('../validations/validations');

const login = async ({ email, password }) => {
  const isEmailValid = validateEmail(email);
  if (!isEmailValid) { return { message: '"email" must be a valid email' }; }
  
  const userExists = await findUser({ email, password });
  if (!userExists) return { message: 'Invalid fields' };
  return userExists;
};

module.exports = {
  login,
};