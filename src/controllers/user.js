const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const service = require('../services/user');

const secret = process.env.JWT_SECRET;

const userRegister = rescue(async (req, res, next) => {
  const user = req.body;

  const emailExist = user.email 
  && await User.findOne({ where: { email: user.email } });
  
  const validations = await service.userRegister(user, emailExist);

  if ('code' in validations) {
    return next(validations);
  }

  await User.create(user);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);
    
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