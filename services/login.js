const { loginValidate, JWTToken } = require('../middlewares');
const { User } = require('../models');

const serviceUserlogin = async (login) => {
  const { email, password } = login;
  const invalidator = await loginValidate(email, password);
  if (invalidator) {
    return invalidator;
  }
  const user = await User.findOne({ where: { email, password } });
console.log(user.dataValues);
  if (user) {
    const { id } = user;

  const token = JWTToken(id, email);
  
  return { code: 200, token };
  }

  return { 
    err: {
    message: 'Invalid fields',
   },
   code: 400 };
  };

  module.exports = {
    serviceUserlogin,
  };