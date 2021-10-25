const jwt = require('jsonwebtoken');
const statusCode = require('http-status-codes');
const loginService = require('../services/loginService');

const segredo = 'meusupersegredo';

const login = async (req, res) => {
  const { email, password } = req.body;

  const userLogin = await loginService.login({ email, password });

  if (userLogin.message) {
      return res.status(statusCode.BAD_REQUEST).json({ message: userLogin.message });
  }
  
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: userLogin }, segredo, jwtConfig);
  return res.status(statusCode.OK).json({ token });
};

module.exports = {
  login,
};
