const { User } = require('../models');
const schema = require('../schemas/loginSchema');

const login = async (email, password) => {
  try {
    const loginValidation = schema.validateLogin(email, password);
    if (loginValidation.err) return loginValidation;
    const loggedUser = await User.findOne({ where: { email, password } });
    // console.log(loggedUser);
    return loggedUser;
  } catch (e) {
    console.log(e.message);
    return { err: { message: 'Algo deu errado' }, status: 500 };
  }
};

module.exports = {
  login,
};
