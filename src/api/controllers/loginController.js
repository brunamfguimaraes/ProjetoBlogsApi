// const rescue = require('express-rescue');
require('dotenv').config();
const jtw = require('jsonwebtoken');
const { loginUser } = require('../services/loginService');

const post = async (req, res, next) => {
  const { password, ...payload } = req.body;
  const userLogin = await loginUser(req.body);

  if (userLogin.isError) {
    return next(userLogin);
  }

  const token = jtw.sign(payload, process.env.SECRET, { expiresIn: '45m' });

  return res.status(200).json({ token });
};

module.exports = {
  post,
};
