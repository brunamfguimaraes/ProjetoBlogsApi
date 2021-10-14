const { User } = require('../models');

const createUser = async (req, res) => {
 console.log('chegei post');
 const { body } = req;
 const created = await User.create(body);
 res.status(201).json({ created });
};

module.exports = {
  createUser,
};