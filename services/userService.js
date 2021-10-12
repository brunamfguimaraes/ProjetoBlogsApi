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

  await User.create(userData);
};

module.exports = { postUserService };
