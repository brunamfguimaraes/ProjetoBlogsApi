const jwt = require('jsonwebtoken');
const { validateLogin } = require('../services/loginService');
require('dotenv').config();

const secret = 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const login = await validateLogin({ email, password });
  // const { code, message } = login;
  if (login.message) {
    return res.status(login.code).json({ message: login.message });
  }
const token2 = jwt.sign({ data: login }, secret, jwtConfig);
return res.status(200).json({ token: token2 });
};

module.exports = {
  userLogin,
};