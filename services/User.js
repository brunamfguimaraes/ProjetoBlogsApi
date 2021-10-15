const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = 'secret';

const userListService = async () => {
  const userList = await User.findAll();

  if (!userList) return null;

  return userList;
};

const loginAuth = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  console.log('oi');

  if (!user) return null;

  const newToken = jwt.sign(
    {
      email,
    },
    SECRET,
  );

  return newToken;
};

module.exports = {
  loginAuth,
  userListService,
};