const jwt = require('jsonwebtoken');
const { Users } = require('../models');
require('dotenv/config');

const secret = process.env.JWT_SECRET;
const validToken = async (req, res, next) => {
  const { authorize } = req.headers;
  let user;
  if (!authorize) return res.status(401).json({ message: 'Token not found' });
  try {
    const decoded = jwt.verify(authorize, secret);
    if (decoded) {
      user = await Users.findOne({ where: { email: decoded } });
    }
    if (user) {
      req.email = decoded;
      next();
    }
  } catch (_e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validToken,
};
