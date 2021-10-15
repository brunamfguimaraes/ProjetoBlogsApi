const { User } = require('../models');
const schema = require('../schemas/loginSchema');

const login = async (email, password) => {
  try {
    const loginValidation = schema.validateLogin(email, password);
    if (loginValidation.err) return loginValidation;
    const loggedUser = await User.findOne({ where: { email, password } });
    console.log(loggedUser);
    if (loggedUser === null) {
      return { err: { message: 'Invalid fields' }, status: 400 };
    }
    return loggedUser;
  } catch (e) {
    console.log(e.name);
    return { err: { message: 'Algo deu errado' }, status: 500 };
  }
};

module.exports = {
  login,
};
