const { conflict, notFound } = require('../helpres/error');
const { postNewUser, getAll, byId } = require('../model/userModel');

const createUser = async (user) => {
  const newUser = await postNewUser(user);

  if (!newUser) return conflict('User already registered');

  return newUser; 
};

const serviceById = async (id) => {
  const user = await byId(id);
  if (!user) {
    return notFound('User does not exist');
  }
  return user;
};

module.exports = {
  createUser,
  getAll,
  serviceById,
};
