const rescue = require('express-rescue');
const { User } = require('../models');
const { jwtLogin } = require('../api/auth/tokenJWT');

const add = rescue(async (req, res) => {
  const { body } = req;
  const newUser = await User.create(body);
  const { id, email } = newUser;
  const payload = { id, email };
  const token = jwtLogin(payload);
  res.status(201).json({ token });
});

const findAll = rescue(async (req, res) => {
  const findUsers = await User.findAll();
  res.status(200).json(findUsers);
});

module.exports = { add, findAll };
