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

const login = async (credentials) => {
  const { email, password } = credentials;

  const validatingEmail = validateField(email, 'email');
  if (validatingEmail.error) return validatingEmail;

  const validatingPassword = validateField(password, 'password');
  if (validatingPassword.error) return validatingPassword;

  const foundUser = await User.findOne({ where: { email } });
  if (!foundUser) return invalidFields;

  return { ...foundUser.dataValues };
};

module.exports = {
  login,
};