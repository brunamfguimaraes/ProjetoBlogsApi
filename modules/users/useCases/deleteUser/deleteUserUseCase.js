const { deleteUser } = require('../../repositories/UserRepository');
const validateAuth = require('../../../../middlewares/validateAuth');

const removeUser = async (auth) => {
  const payload = await validateAuth(auth);

  await deleteUser(payload);
};

module.exports = removeUser;