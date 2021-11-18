const user = require('./userValidation');

const createUser = async (displayName, email, password) => {
  user.displayNameUser(displayName);
  user.emailExist(email);
  user.emailIsValid(email);
  user.passwordExist(password);
  user.passwordIsValid(password);
  await user.userExist(email);
};

const login = async (email, password) => {
  user.emailExistAndNotEmpty(email);
  user.passwordExistAndNotEmpty(password);
  await user.loginInvalid(email, password);
};

const userExistById = (data) => {
  user.existById(data);
};

module.exports = { createUser, login, userExistById };
