const { User } = require('../models');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const response = await User.create({ displayName, email, password, image });
  return res.status(201).json(response);
};

module.exports = { 
  createUser,
};
