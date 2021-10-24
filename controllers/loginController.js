const jwt = require('jsonwebtoken');
const { validateLogin } = require('../services/loginService');
require('dotenv').config();

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const login = await validateLogin({ email, password });
  const { code, message } = login;
  if (message) {
    return res.status(code).json({ message });
  }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};
const token = jwt.sign({ data: login }, process.env.JWT_SECRET, jwtConfig);
return res.status(200).json({ token });
};

module.exports = {
  userLogin,
};