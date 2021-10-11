const jwt = require('jsonwebtoken');
const { User } = require('../models');

const segredo = 'secreto';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token === '') {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  try {
    const { email } = jwt.verify(token, segredo);
    const { dataValues: { id } } = await User.findOne({ where: { email } });
    req.user = id;
    next();
  } catch (_err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { validateJWT };
