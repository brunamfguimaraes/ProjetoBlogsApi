const { Users } = require('../../models');

const acessLogin = async ({ email, password }) => {
  const result = await Users.findOne({ where: { email, password } });
  return result;
};

module.exports = { acessLogin };