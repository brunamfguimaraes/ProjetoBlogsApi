const jwt = require('jsonwebtoken');
const { User, BlogPost } = require('../models');

require('dotenv').config();

const validatesDisplayName = async (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(400).json({ 
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (email === '' || !email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  next();
};

const validateEmailFormat = async (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;

  if (!regex.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (password === '' || !password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  next();
};

const validatePasswordLength = async (req, res, next) => {
  const { password } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ 
      message: '"password" length must be 6 characters long',
    });
  }
  next();
};

const emailAlreadyExists = async (req, res, next) => {
  const { email } = req.body;
  const registeredEmail = await User.findOne({ where: { email } });

  if (registeredEmail) {
    return res.status(409).json({ message: 'User already registered' });
  }
  next();
};

const SECRET = 'batatinhafrita123';
const jwtConfig = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const validateToken = (request, response, next) => {
  const token = request.headers.authorization;
  if (!token) return response.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, SECRET, jwtConfig);
    request.user = decoded;
    next();

    return decoded;
  } catch (error) {
    console.log(error);
    return response.status(401).json({ message: 'Expired or invalid token' });
  }
};

const getUsers = async () => {
  const result = await User.findAll();

  return result;
};

const getUsersById = async (id) => {
  const result = await User.findOne({ where: { id } });

  return result;
};

const deletePost = async (id, userId) => {
  const result = await BlogPost.findOne({ where: { id } });
  if (!result) {
    return { error: { status: 404, message: 'Post does not exist' } };
  }
 
  if (result.userId !== userId) {
    return { error: { status: 401, message: 'Unauthorized user' } };
  }
 
  await BlogPost.destroy({ where: { userId: id } });

  return result;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
  const user = await User.findOne({ where: { id } });

  return user;
};

module.exports = {
  validatesDisplayName,
  validateEmail,
  validateEmailFormat,
  validatePassword,
  validatePasswordLength,
  emailAlreadyExists,
  validateToken,
  getUsers,
  getUsersById,
  deletePost,
  deleteUser,
}; 