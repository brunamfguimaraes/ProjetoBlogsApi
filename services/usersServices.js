const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');
const isValidEmail = require('../validations/isValidEmail');
const checkIfTheUserExists = require('../validations/checkIfTheUserExists');

const createUserServices = async ({ displayName, email, password, image }) => {
  if (isValidEmail(email).isError) return isValidEmail(email);
  if ((await checkIfTheUserExists(email, password)).isError) { 
    return checkIfTheUserExists(email, password); 
  }

  const a = await User.create({ displayName, email, password, image });
  return { isError: false };
};

module.exports = {
  createUserServices,
};