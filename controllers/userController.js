const rescue = require('express-rescue');
const { User } = require('../models');

const add = rescue(async (req, res) => {
  const { body } = req;
  const newUser = await User.create(body);
  res.status(201).json({ newUser });
});

module.exports = { add };
