const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Váriavies de ambiente
require('dotenv/config');

// HTTP status codes
const HTTP = {
  Unauthorized: 401,
};

// Verifica se foi passado o token
const checkExistence = (token) => {
  if (!token || token === '') return false;
  return true;
};

// JWT Secret
const secret = process.env.JWT_SECRET;

// Valida o token
const validateToken = async (req, res, next) => {
  const { authorization } = req.headers; let user;
  
  if (!checkExistence(authorization)) {
    return res.status(HTTP.Unauthorized).json({ message: 'Token not found' });
  }

  try {
    // Realiza o decode do token
    const decoded = jwt.verify(authorization, secret);
    
    if (decoded.data) {
      // Busca o usuário referente ao email do token 
      user = await User.findOne({ where: { email: decoded.data } });
    }

    if (user) { 
      req.email = decoded.data;
      next(); 
    }
  } catch (_e) {
    return res.status(HTTP.Unauthorized).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken; 