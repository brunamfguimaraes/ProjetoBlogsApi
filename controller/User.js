const User = require('../models/User');

const createUser = async (req, res) => {
 const { body } = req;
 const create = await User.create(body);
 res.status(201).json({ create });
};

module.exports = {
  createUser,
};