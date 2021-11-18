const { listAllUsers } = require('../../repositories/UserRepository');
const validateAuth = require('../../../../middlewares/validateAuth');

const listUsers = async (auth) => {
  await validateAuth(auth);

  const users = await listAllUsers();

  return users;
};

module.exports = listUsers;