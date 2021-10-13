const rescue = require('express-rescue');
const UserService = require('../services/UserService.js');

const newUser = rescue(async (req, res, next) => {
  const userInfo = req.body;
  const user = await UserService.createUser(userInfo);

  if (user.error) return next(user.error);

  res.status(201).json(user);
});

module.exports = { newUser };
