const { User } = require('../models');

const postLoginService = async (email, password) => {
  const userLogin = await User.findOne({ where: { email, password } });

  if (!userLogin) {
    return { code: 'BAD_REQUEST', message: 'Invalid fields' }; 
  }

  return userLogin;
};

module.exports = { postLoginService };
