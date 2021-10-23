const { User } = require('../models');
const { bodyValidator, userExistsValidator } = require('./userValidator');

async function createUser(body) {
  await bodyValidator(body);
  await userExistsValidator(body);
  const user = await User.create(body);
  return user;
}

module.exports = {
  createUser,
};