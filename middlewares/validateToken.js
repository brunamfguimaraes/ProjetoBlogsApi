const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
   
    req.userId = payload.dataValues.id;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });  
  }
};

module.exports = validateToken;