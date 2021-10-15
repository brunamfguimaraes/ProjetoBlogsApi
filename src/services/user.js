const { User } = require('../../models');
const validations = require('../validations/user');
const utils = require('../utils');

async function newUser(displayName, email, password, image) {
  validations.userValidation(displayName, email, password, image);
  await validations.emailValidation(email, User);
  await User.create({ displayName, email, password, image });
  const token = utils.createToken({ displayName, email });
  return token;
}

module.exports = {
  newUser,
};
