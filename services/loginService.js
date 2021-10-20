const loginModels = require('../model/loginModel');
const { badRequest } = require('../errors/error');

const loginUser = async ({ email, password }) => {
  const result = await loginModels.loginUser({ email, password });

  if (!result) return badRequest('Invalid fields');

  return result;
};

module.exports = {
  loginUser,
};