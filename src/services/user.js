const { 
  emailValid,
  displayNameValid,
  passwordValid, 
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

module.exports = { 
  userRegister,
};