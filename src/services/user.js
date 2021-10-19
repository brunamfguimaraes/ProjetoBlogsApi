const { 
  emailValid,
  displayNameValid,
  passwordValid,
  userExistentValidById,
} = require('../validations');

const userRegister = async ({ email, displayName, password }, emailExist) => {
  const verifyFields = displayNameValid(displayName) 
  || emailValid(email, emailExist) 
  || passwordValid(password);

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