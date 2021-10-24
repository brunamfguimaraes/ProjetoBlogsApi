const { User } = require('../models');

const validateEmail = async (email) => {
  if (!email) return { erro: { code: 400, message: '"email" is required' } };

  if (email === null) return { erro: { code: 400, message: '"email" is not allowed to de ampty' } };

  const userExist = await User.findOne({ where: { email } });
  if (!userExist) return { erro: { code: 409, message: 'invalid fields' } };

  return 'valid';
};

const validatePassword = async (password) => {
  if (!password) return { erro: { code: 400, message: '"password" is required' } };

  if (password === null) { 
    return { erro: { code: 400, message: '"password" is not allowed to de ampty' } }; 
  }

  return 'valid';
};

module.exports = { validateEmail, validatePassword };