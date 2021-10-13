const middlewares = require('../middlewares');
const tokenGenerate = require('./tokenGenerate');

const userLogin = async (body) => {
  const { email, password } = body;

  const validateUser = await middlewares.existsUser(email, password);
  if (validateUser.message) return validateUser;
  
  return tokenGenerate(validateUser);
};

module.exports = {
  userLogin,
};