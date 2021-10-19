// const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');
const isValidEmail = require('../validations/isValidEmail');
const checkIfTheUserExists = require('../validations/checkIfTheUserExists');

const createUserServices = async ({ displayName, email, password, image }) => {
  if (isValidEmail(email).isError) return isValidEmail(email);
  if ((await checkIfTheUserExists(email, password)).isError) { 
    return checkIfTheUserExists(email, password); 
  }

  await User.create({ displayName, email, password, image });
  return { isError: false };
};

const getAllUsersServices = async () => {
  const getALLUsers = await User.findAll();
  console.log(getALLUsers);
};

module.exports = {
  createUserServices,
  getAllUsersServices,
};