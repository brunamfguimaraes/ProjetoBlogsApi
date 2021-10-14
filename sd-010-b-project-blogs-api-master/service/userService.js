const { User } = require('../models');

const { 
  validateIfFieldsExist, validateIfLoginFieldsExist } = require('../middlewares/UserMiddleware');

const createUserService = async (body) => {
  const { email } = body;
  const validateField = validateIfFieldsExist(body);
  if (validateField) return validateField;

  const validateUser = await User.findOne({ where: { email } });
  if (validateUser) return { message: 'User already registered' }; 
  const user = await User.create(body);
  return user;
};

const loginUserService = async (body) => {
  const { email, password } = body;
  const validateField = validateIfLoginFieldsExist(body);
  if (validateField) return validateField;

  const validateUser = await User.findOne({ where: { email, password } });

  if (!validateUser) return { message: 'Invalid fields' };

  return true; 
};

const getAllUsersService = async () => {
  const user = await User.findAll();
  
  return user;
};
module.exports = { createUserService,
loginUserService, 
  getAllUsersService, 
};