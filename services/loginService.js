const { User } = require('../models');

const postLoginService = async (email, password) => {
  if (!await User.findOne({ where: { email, password } })) {
    return { code: 'BAD_REQUEST', message: 'Invalid fields' }; 
  }
};

module.exports = { postLoginService };
