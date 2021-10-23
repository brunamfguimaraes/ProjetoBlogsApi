const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const secret = 'chave-secreta';

const login = async (req, res) => {
  const { email, password } = req.body;

  const loginUser = await loginService.login(email, password);

  if (loginUser.message) {
    return res.status(loginUser.status).json({ message: loginUser.message });
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

 const data = {
  email,
 };

  const token = jwt.sign({ data }, secret, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = {
  login,
};