const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');

const checkIfTheUserExists = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  if (user) {
    return { 
      isError: true,
      message: 'User already registered',
      code: StatusCodes.CONFLICT,
    }; 
  }
  return { isError: false };
};

module.exports = checkIfTheUserExists;