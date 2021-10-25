const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const { User } = require('../models');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decode = jwt.verify(token, secret);

    const user = await User.findOne({ where: { email: decode.data.email } });

    if (!user) return res.status(401).json({ message: 'Token\'s user not found' });

    req.user = user.dataValues;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};