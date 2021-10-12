const { Users } = require('../../models');

const getByEmail = async (email) => {
  const userByEmail = await Users.findOne({ where: { email } });
  return userByEmail;
};

const postNewUser = async (userData) => {
  const foundUser = await getByEmail(userData.email);

  if (foundUser) return;

  const newUser = await Users.create(userData);
  return newUser;
};

const getAll = async () => {
  const users = await Users.findAll();
  return users; 
};

const byId = async (id) => {
  const userId = await Users.findOne({ where: { id } });
  return userId;
};

module.exports = {
  postNewUser,
  getAll,
  byId,
};
