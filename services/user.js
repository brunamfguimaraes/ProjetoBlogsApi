const jwt = require('jsonwebtoken');
const { User } = require('../models');

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

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;

    return next();
  } catch (e) {
    return res.status(401).json({ e: 'Expired or invalid token' });
  }
};

module.exports = {
  validatesDisplayName,
  validateEmail,
  validateEmailFormat,
  validatePassword,
  validatePasswordLength,
  emailAlreadyExists,
  validateToken,
}; 