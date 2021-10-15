const jwt = require('jsonwebtoken');
const { Users } = require('../models');
require('dotenv/config');

const secret = process.env.JWT_SECRET;
const validToken = async (req, res, next) => {
  const { authorize } = req.headers;
  let user;
  if (!authorize) return res.status(401).json({ message: 'Token not found' });
  try {
    const decodes = jwt.verify(authorize, secret);
    if (decodes.data) {
      user = await Users.findOne({ where: { email: decodes.data } });
    }
    if (user) {
      req.email = decodes.data;
      next();
    }
  } catch (_e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validToken,
};
