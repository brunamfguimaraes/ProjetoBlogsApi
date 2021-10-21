// const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');
const isValidEmail = require('../validations/isValidEmail');
const checkIfTheUserExists = require('../validations/checkIfTheUserExists');

const createUserServices = async ({ displayName, email, password, image }) => {
  if (isValidEmail(email).isError) return isValidEmail(email);
  if ((await checkIfTheUserExists(email, password)).isError) { 
    return checkIfTheUserExists(email, password); 
  }

  const user = await User.create({ displayName, email, password, image });
  return { isError: false, newUser: user };
};

const getAllUsersServices = async () => User.findAll({ attributes: { exclude: ['password'] } });

const findUserServices = async (idImput) => {
  const user = await User.findByPk(idImput, { attributes: { exclude: ['password'] } });
  
  if (!user) return { isError: true, message: 'User does not exist' };
  return user;
};

module.exports = {
  createUserServices,
  getAllUsersServices,
  findUserServices,
};