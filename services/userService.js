const { User } = require('../models');
const schema = require('../schemas/userSchema');

const postNewUser = async (displayName, email, password, image) => {
  try {
    const infoValidation = schema.validateNewUser(displayName, email, password);
    if (infoValidation.err) return infoValidation;
    const newUser = await User.create({ displayName, email, password, image });
    return newUser;
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return { err: { message: 'User already registered' }, status: 409 };
    }
    return { err: { message: 'Algo deu errado' }, status: 500 };
  }
};

const validateLogin = async (email, password) => {
  try {
    const loggedUser = await User.findOne({ where: { email, password } });
    // console.log(loggedUser);
    return loggedUser;
  } catch (e) {
    console.log(e.message);
    return { err: { message: 'Algo deu errado' }, status: 500 };
  }
};

module.exports = {
  postNewUser,
  validateLogin,
};