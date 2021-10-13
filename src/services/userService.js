const { userDataEntries } = require('../validations/userValidation');
const { User } = require('../models');
 
const createUser = async (userData) => {
  const entries = userDataEntries(userData);

  if (entries.message) return entries;

  const isConflict = await User.findOne({ where: { email: userData.email } });

  if (isConflict) return { message: 'User already registered', conflict: true };

  return User.create(userData);
};

module.exports = {
  createUser,
};