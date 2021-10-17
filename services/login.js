const { loginValidate, JWTToken, userFinder } = require('../middlewares');

const serviceUserlogin = async (login) => {
  const { email, password } = login;
  const invalidator = loginValidate(email, password);
  if (invalidator) {
    return invalidator;
  }
  const user = await userFinder(email);
  console.log(user);
  if (user) {
    const token = await JWTToken(email);
  
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