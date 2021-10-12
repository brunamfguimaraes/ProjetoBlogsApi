const loginModels = require('../model/loginModel');
const { badRequest } = require('../middleware/error/constructErro');

const login = async (req) => {
  const { email, password } = req;
  const result = await loginModels.acessLogin({ email, password });
  if (!result) return badRequest('Invalid fields');
  return result;
};

module.exports = login;
