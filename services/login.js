const { User } = require('../models');
const { loginValidator } = require('./userValidator');
const MyError = require('./errorClass');

async function execLogin(user) {
  const { email } = user;
  await loginValidator(user);
  const us = await User.findAll({ where: { email } });
  if (us.length === 0) throw new MyError('Invalid fields', 400);
}

module.exports = {
  execLogin,
};