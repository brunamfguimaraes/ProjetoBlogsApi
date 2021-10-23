const {
  User,
} = require('../models');

const {
  validateEmail,
  validatePassword,
  validateName,
  validateUniqueUser,
} = require('../validation/userValidation');

const USER_NOT_FOUND = {
  error: {
    status: 404,
    message: 'User does not exist',
  },
};

const createUser = async (userData) => {
  const {
    displayName,
    email,
    password,
  } = userData;
  
  const validatingEmail = validateEmail(email);
  if (validatingEmail.error) return validatingEmail;
  
  const validatingUniqueUser = await validateUniqueUser(User, email);
  if (validatingUniqueUser.error) return validatingUniqueUser;

  const validatingName = validateName(displayName);
  if (validatingName.error) return validatingName;
  
  const validatingPassword = validatePassword(password);
  if (validatingPassword.error) return validatingPassword;

  const newUser = await User.create(userData);
  return { ...newUser.dataValues };
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return USER_NOT_FOUND;

  return { ...user.dataValues };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};