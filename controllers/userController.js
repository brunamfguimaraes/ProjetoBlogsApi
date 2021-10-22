const userService = require('../services/userService');

const createUser = async (res, req) => {
  const { displayName, email, password, image } = req.body;

  const newUser = await userService.createUser(displayName, email, password, image);

  if (newUser.message) {
    return res(newUser.status).json({ message: newUser.message });
  }

  return res.status(200).json(newUser);
};

module.exports = {
  createUser,
};