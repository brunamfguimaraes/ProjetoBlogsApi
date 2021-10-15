const jwt = require('jsonwebtoken');

const SECRET = 'secret';

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  try {
    const decode = jwt.verify(authorization, SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  verifyToken,
};