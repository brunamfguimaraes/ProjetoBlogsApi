const { Op } = require('sequelize');
const { User } = require('../models');

const { 
  isEmailLoginValid,
  passwordLoginIsValid,
  } = require('../validations/index');

const login = async (email, password) => {
  const validateEmail = isEmailLoginValid(email);
  if (validateEmail.message) return validateEmail;

  const validatePassword = passwordLoginIsValid(password);
  if (validatePassword.message) return validatePassword;
  
  const newLogin = await User.findOne({ where: {
    [Op.and]: [{ email, password }],
  } });
  
  if (!newLogin) return { message: 'Invalid fields' };

  return newLogin;
};

module.exports = {
  login,
};