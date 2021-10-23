const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const secret = 'chave-secreta';

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const newUser = await userService.createUser(displayName, email, password, image);

  if (newUser.message) {
    return res.status(newUser.status).json({ message: newUser.message });
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  delete newUser.password;

  const token = jwt.sign({ data: newUser }, secret, jwtConfig);

  return res.status(201).json({ token });
};

module.exports = {
  createUser,
};