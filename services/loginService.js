const { User } = require('../models');
const Error = require('../helpers/errors');

const checkUserExist = async (email) => {
  const checkEmail = await User.findOne({ where: { email } });
  if (!checkEmail) {
    return Error.badRequest('Invalid fields');
  }
  return checkEmail;
}; 

module.exports = {
  checkUserExist,
};