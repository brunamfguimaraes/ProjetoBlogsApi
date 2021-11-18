const { listUserById } = require('../../repositories/UserRepository');
const validateAuth = require('../../../../middlewares/validateAuth');


const userId = async(id, auth) => {
  await validateAuth(auth);

  const users = await listUserById(id);

  if(!users) {
    throw new Error({code: 'NOT_FOUND', message: "User does not exist"});
  }

  const { password, ...userBD } = users.dataValues;

  return userBD;
}

module.exports = userId;