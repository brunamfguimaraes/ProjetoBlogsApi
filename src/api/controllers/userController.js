const rescue = require('express-rescue');
require('dotenv').config();
const jtw = require('jsonwebtoken');
const { createUser } = require('../services/userService');

console.log('controller');

const post = rescue(async (req, res, next) => {
  console.log('post');
  console.log(req.body);
  const { password, ...payload } = req.body;
  const user = await createUser(req.body);

  if (user.isError) {
    console.log('if');
    return next(user);
  }

  const token = jtw.sign(payload, process.env.SECRET, { expiresIn: '45m' });
  console.log('response');
  return res.status(201).json({ token });
});

module.exports = {
  post,
};
