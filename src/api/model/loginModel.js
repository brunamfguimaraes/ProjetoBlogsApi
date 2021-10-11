const { Users } = require('../../models');

const loginUser = async ({ email, password }) => {
  const user = await Users.findOne({ where: { email, password } });
  return user;
};

module.exports = {
  loginUser,
}; 