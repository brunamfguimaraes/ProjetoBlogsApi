const jwt = require('jsonwebtoken');

const segredo = 'secreto';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  try {
    jwt.verify(token, segredo);
    next();
  } catch (_err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { validateJWT };
