const { errorNewUser } = require('../middleware/error/constructErro');
const { postNewUser, getAll, getId } = require('../model/userModel');
const { errorById } = require('../middleware/error/constructErro');

const createUser = async (user) => {
  const newUser = await postNewUser(user);

  if (!newUser) return errorNewUser('User already registered');

  return newUser; 
};

const serviceGetId = async (id) => {
  const resultId = await getId(id);
  if (!resultId) {
    return errorById('User does not exist');
  }
  return resultId;
};

module.exports = {
  createUser,
  getAll,
  serviceGetId,
};