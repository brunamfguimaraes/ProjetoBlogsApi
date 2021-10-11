const { errorNewUser } = require('../middleware/error/constructErro');
const { postNewUser } = require('../model/userModel');

const createUser = async (user) => {
  const newUser = await postNewUser(user);

  if (!newUser) return errorNewUser('User already registered');

  return newUser; 
};

module.exports = {
  createUser,
};