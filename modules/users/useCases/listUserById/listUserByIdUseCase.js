const { listUserById } = require('../../repositories/UserRepository');
const validateAuth = require('../../../../middlewares/validateAuth');

const errorMessage = (code, message) => ({
  code,
  message,
});

const userId = async (id, auth) => {
  await validateAuth(auth);

  const users = await listUserById(id);

  if (!users) {
    throw errorMessage('NOT_FOUND', 'User does not exist');
  }

  const { password, ...userBD } = users.dataValues;

  return userBD;
};

module.exports = userId;