const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

const generateJWT = async (req, res) => {
try {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  const token = jwt.sign({ id: user.id, email: user.email }, secret, jwtConfig);
  res.status(req.statusCode).json({ token });
} catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = { generateJWT, validateJWT };
