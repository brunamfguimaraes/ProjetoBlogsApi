const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretPassword = process.env.JWT_SECRET;

const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const authJWT = async (req, res, next) => {
  try {
    const { email, displayName } = req.body;
    const user = { email, displayName };

    const token = jwt.sign(user, secretPassword, JWT_CONFIG);   

    req.token = token; 

    next();       
  } catch (error) {
    res.status(500).json({ error });    
  }
};

module.exports = authJWT;