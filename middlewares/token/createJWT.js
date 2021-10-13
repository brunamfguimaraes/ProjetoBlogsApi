const jwt = require('jsonwebtoken');
require('dotenv').config();

const senha = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
module.exports = (req, res, next) => {
  try {
    const { email, displayName } = req.body;
    const user = { email, displayName };
    
    const token = jwt.sign(user, senha, jwtConfig);

    req.token = token;

    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};