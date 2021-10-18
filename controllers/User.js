const { CREATED, INTERNAL_SERVER_ERROR } = require('http-status');
const { User } = require('../models');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const createdUser = await User.create({ displayName, email, password, image });
    res.status(CREATED).json(createdUser);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};
module.exports = {
  createUser,
};