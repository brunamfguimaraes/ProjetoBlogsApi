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

module.exports = {
  postNewUser,
};
