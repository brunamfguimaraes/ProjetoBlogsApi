const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const secret = 'chave-secreta';

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const newUser = await userService.createUser(displayName, email, password, image);

  if (newUser.message) {
    return res.status(newUser.status).json({ message: newUser.message });
  }

  const data = {
    displayName,
    email,
    image,
  };

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data }, secret, jwtConfig);

  return res.status(201).json({ token });
};

const getAllUsers = async (req, res) => {
  const getAll = await userService.getAllUsers();

  return res.status(200).json(getAll);
};  

module.exports = {
  createUser,
  getAllUsers,
};