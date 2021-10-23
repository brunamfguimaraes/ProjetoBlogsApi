const {
  User,
} = require('../models');

const { validateField } = require('../validation/loginValidation');

const invalidFields = {
  error: {
    status: 400,
    message: 'Invalid fields',
  },
};

const login = (credentials) => {
  const { email, password } = credentials;

  const validatingEmail = validateField(email);
  if (validatingEmail.error) return validatingEmail;

  const validatingPassword = validateField(password);
  if (validatingPassword.error) return validatingPassword;

  const foundUser = User.foundOne({ where: { email } });
  if (!foundUser) return invalidFields;

  return { ...foundUser.dataValues };
};

module.exports = {
  login,
};