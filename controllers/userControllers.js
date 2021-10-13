const userServices = require('../services/userServices');

const createUser = async (req, res, next) => {
  const newUser = await userServices.createUser(req.body);
  if (newUser.message) return next(newUser);
  return res.status(201).json({ token: newUser });
};

module.exports = {
  createUser,
};
