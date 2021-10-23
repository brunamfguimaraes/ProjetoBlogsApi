const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const newUser = await userService.createUser(displayName, email, password, image);

  if (newUser.message) {
    return res.status(newUser.status).json({ message: newUser.message });
  }

  return res.status(201).json(newUser);
};

module.exports = {
  createUser,
};