const { User } = require('../models');
const Error = require('../utils/createObjError');

const verify = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) return Error.badRequest('Invalid fields');
  return user;
};

module.exports = {
  verify,
};
