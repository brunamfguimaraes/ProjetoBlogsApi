const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const service = require('../services/user');

const secret = process.env.JWT_SECRET;

const userRegister = rescue(async (req, res, next) => {
  const { email, displayName, image, password } = req.body;
  
  const emailExist = email 
  && await User.findOne({ where: { email } });
  
  const validations = await service.userRegister({ email, displayName, password }, 
  emailExist);

  if ('code' in validations) {
    return next(validations);
  }

  await User.create({ email, displayName, image, password });

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { email, displayName } }, secret, jwtConfig);
    
  return res.status(201).json({ token });
});

const getAllUsers = rescue(async (req, res) => {
  const allUsers = await User.findAll();

  return res.status(200).json(allUsers);
});

const getUserById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const userById = await User.findOne({ where: { id } });

  const validations = await service.getUserById(userById);

  if ('code' in validations) {
    return next(validations);
  }

  return res.status(200).json(userById);
});

module.exports = { 
  userRegister,
  getAllUsers,
  getUserById,
};