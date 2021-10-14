require('dotenv').config();
const jwt = require('jsonwebtoken');
const messages = require('../helpers/validationMessages');

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json(messages.TOKEN_NOT_FOUND);
  }

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).json(messages.INVALID_TOKEN);
    }

    req.id = decoded.id;
    
    next();
  });
};

module.exports = validateJWT;