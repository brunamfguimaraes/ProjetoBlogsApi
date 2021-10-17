require('dotenv/config');
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) { return res.status(401).json({ message: 'Token not found' }); }
  try {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    
    jwt.verify(token, process.env.JWT_SECRET, jwtConfig);
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const emailUser = (token) => {
  try {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    
    const { email } = jwt.decode(token, process.env.JWT_SECRET, jwtConfig);
    
    return email;
  } catch (error) {
    return error.message;
  }
};
module.exports = {
  validateToken,
  emailUser,
};