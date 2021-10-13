const { userDataEntries } = require('../validations/userValidation');
const { User } = require('../models');
 
const createUser = async (userData) => {
  const entries = userDataEntries(userData);

  if (entries.message) return entries;

  return User.create(userData);
};

module.exports = {
  createUser,
};