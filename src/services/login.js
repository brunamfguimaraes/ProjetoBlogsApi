const { 
  emailValid,
  passwordValid,
  userExistentValid,
} = require('../validations');

const loginFunction = async ({ email, password }, userExist) => {
  const verifyFields = emailValid(email, null) 
  || passwordValid(password)
  || userExistentValid(userExist);

  if (verifyFields) {
    return verifyFields;
  }

  return {};
};

module.exports = { 
  loginFunction,
};