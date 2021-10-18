const jwt = require('jsonwebtoken');

const segredo = 'secretToken';
const missingAuth = { message: 'Token not found' };

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json(missingAuth);
  }
  try {
    const decoded = jwt.verify(authorization, segredo);
    req.user = decoded.data;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};