const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const statusCode = require('http-status-codes');

const segredo = 'meusupersegredo';

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await userService.createUser({ displayName, email, password, image });

  if (user.message === 'User already registered') {
    return res.status(statusCode.CONFLICT).json({ message: user.message });
  } 

  if (user.message) {
      return res.status(statusCode.BAD_REQUEST).json({ message: user.message });
  }
  
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, segredo, jwtConfig);
  return res.status(statusCode.CREATED).json({ token });
};

module.exports = {
  createUser,
};
