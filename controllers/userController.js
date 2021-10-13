const { User } = require('../models');

const userController = async (req, res) => {
  const { body } = req;
  const newUser = await User.create(body);
  res.status(201).json({ newUser });
};

module.exports = userController;
