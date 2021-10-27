const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = process.env.JWT_SECRET;

const userListService = async () => {
  const userList = await User.findAll();

  if (!userList) return null;

  return userList;
};

const loginAuth = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) return null;

  console.log(user.id);

  const newToken = jwt.sign(
    {
      email,
      userId: user.id,
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