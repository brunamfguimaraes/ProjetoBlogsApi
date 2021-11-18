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
  user.emailExist(email);
  user.emailNotEmpty(email);
  user.passwordExist(password);
  user.passwordNotEmpty(password);
  await user.loginInvalid(email, password);
};

module.exports = { createUser, login };
