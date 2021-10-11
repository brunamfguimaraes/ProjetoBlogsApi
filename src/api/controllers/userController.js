const rescue = require('express-rescue');
require('dotenv').config();
const jtw = require('jsonwebtoken');
const { createUser } = require('../services/userService');

const post = rescue(async (req, res, next) => {
  const { password, ...payload } = req.body;
  const user = await createUser(req.body);

  if (user.isError) {
    return next(user);
  }

  const token = jtw.sign(payload, process.env.SECRET, { expiresIn: '45m' });

  return res.status(201).json({ token });
});

module.exports = {
  post,
};
