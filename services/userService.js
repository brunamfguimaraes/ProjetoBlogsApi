const { User } = require('../models');

const postUserService = async (displayName, email, password, image) => {
  const userData = { displayName, email, password, image };

  if (typeof displayName !== 'string' || displayName.length < 8) { 
    return {
      code: 'BAD_REQUEST',
      message: '"displayName" length must be at least 8 characters long',
    }; 
  }

  if (await User.findOne({ where: { email } })) {
    return { code: 'CONFLICT', message: 'User already registered' }; 
  }
  
  return User.create(userData);
};

const getUsersService = () => User.findAll();

const getUserByIdService = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return { code: 'NOT_FOUND', message: 'User does not exist' }; 
  }

  return user;
};

module.exports = { postUserService, getUsersService, getUserByIdService };
