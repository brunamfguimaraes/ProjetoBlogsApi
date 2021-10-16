const { 
  emailValid,
  displayNameValid,
  passwordValid,
  userExistentValidById,
} = require('../validations');

const userRegister = async (user, emailExist) => {
  const verifyFields = displayNameValid(user.displayName) 
  || emailValid(user.email, emailExist) 
  || passwordValid(user.password);

  if (verifyFields) {
    return verifyFields;
  }

  return {};
};

const getUserById = async (userById) => {
  const verifyFields = userExistentValidById(userById);

  if (verifyFields) {
    return verifyFields;
  }

  return {};
};

module.exports = { 
  userRegister,
  getUserById,
};