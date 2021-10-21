const { User } = require('../models');

const checkEmailUser = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) return { fieldError: true, message: 'User already registered' };

  return { isError: false };
};

const findById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return { fieldError: true, message: 'User does not exist' };
  }

  return user;
};

const checkUserForDelete = async (id, user) => {
  console.log('id console', id);
  
  const deleteUser = await User.findByPk(id);
  
  if (user.id !== deleteUser.userId) {        
    console.log('updatepost console', deleteUser.userId, user.id);
    return { fieldError: true, message: 'Unauthorized user' };    
  }
  return { fieldError: false };
};

module.exports = {
  checkEmailUser,
  findById,
  checkUserForDelete,
};