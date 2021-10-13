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
  const userAll = await Users.findAll();
  return userAll;
};

const getId = async (id) => {
  const userId = await Users.findOne({ where: { id } });
  return userId;
};

module.exports = {
  postNewUser,
  getAll,
  getId,
};
