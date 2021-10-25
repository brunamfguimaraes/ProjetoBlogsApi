const jwt = require('jsonwebtoken');

const { User } = require('../models');

const segredo = 'seusecretdetoken';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) { return res.status(401).json({ message: 'Token not found' }); }
  try {
    const decoded = jwt.verify(token, segredo);
    const user = await User.findOne(
        { where: { email: decoded.data.email } },
    );
    if (!user) {
        return res.status(401).json({ message: 'Expired or invalid token' }); 
    }
    req.user = user;
    next();
  } catch (_err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;