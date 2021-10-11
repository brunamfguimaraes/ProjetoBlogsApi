const rescue = require('express-rescue');
require('dotenv').config();
const jtw = require('jsonwebtoken');
const { loginUser } = require('../services/loginService');

const post = rescue(async (req, res) => {
  const { password, ...payload } = req.body;
  const userLogin = await loginUser(req.body);

  if (userLogin.isError) {
    return res.status(400).json({ message: userLogin.message });
  }

  const token = jtw.sign(payload, process.env.SECRET, { expiresIn: '45m' });

  return res.status(200).json({ token });
});

module.exports = {
  post,
};
