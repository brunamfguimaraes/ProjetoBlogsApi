const userServices = require('../services/userServices');

const createUser = async (req, res, next) => {
  const newUser = await userServices.createUser(req.body);
  if (newUser.message) return next(newUser);
  return res.status(201).json({ token: newUser });
};

const login = async (req, res, next) => {
  const user = await userServices.login(req.body);
  if (user.message) return next(user);
  return res.status(200).json({ token: user });
};

module.exports = {
  createUser,
  login,
};
