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

  console.log(user.dataValues.id);

  if (!user) return null;

  const newToken = jwt.sign(
    {
      email,
      userId: user.dataValues.id,
    },
    SECRET,
  );

  return newToken;
};

const userDataService = async (id) => {
  const user = await User.findByPk(id);

  if (!user) return null;

  return user;
};

module.exports = {
  loginAuth,
  userListService,
  userDataService,
};