const rescue = require('express-rescue');
const { User } = require('../models');

const login = rescue(async (req, res) => {
  const { email } = req.body;
  const loginResult = await User.findOne({ where: { email } });

  res.status(200).json(loginResult);
});

module.exports = { login };
