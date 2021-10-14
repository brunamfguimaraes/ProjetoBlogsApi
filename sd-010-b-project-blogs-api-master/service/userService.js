const { User } = require('../models');

const { 
  validateIfFieldsExist, validateIfLoginFieldsExist } = require('../middlewares/UserMiddleware');

const createUserService = async (body) => {
  const { email } = body;
  const validateField = validateIfFieldsExist(body);
  // console.log(validateField, 'validatefield');
  if (validateField) return validateField;

  const validateUser = await User.findOne({ where: { email } });
  // console.log(validateUser, 'validate user');
  if (validateUser) return { message: 'User already registered' }; 
  const user = await User.create(body);
  return user;
};

const LoginUserService = async (body) => {
  const { email, password } = body;
  const validateField = validateIfLoginFieldsExist(body);
  if (validateField) return validateField;

  const validateUser = await User.findOne({ where: { email, password } });

  if (!validateUser) return { message: 'Invalid fields' };

  return true; 
};
module.exports = { createUserService, LoginUserService };