const { User } = require('../models');

const isUserExists = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) return { response: false, userId: null };

  return { response: !!user, userId: user.id };
};

const loginUser = async ({ email, password }) => {
  const { response, userId } = await isUserExists({ email, password });

  if (!response) { 
    return { isError: true, message: 'Invalid fields' }; 
  }
  return { isError: false, userId };
};

module.exports = { loginUser };