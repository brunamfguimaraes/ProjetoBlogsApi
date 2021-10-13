const rescue = require('express-rescue');
const UserService = require('../services/UserService.js');

const newUser = rescue(async (req, res) => {
  const userInfo = req.body;
  const user = await UserService.createUser(userInfo);

  res.status(200).json(user);
});

module.exports = { newUser };
