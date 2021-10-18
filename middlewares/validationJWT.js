require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const messages = require('../helpers/validationMessages');

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json(messages.TOKEN_NOT_FOUND);
  }

  try {
    const decoded = jwt.verify(token, secret);
    const { email } = decoded.payload;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json(messages.INVALID_TOKEN);

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json(messages.INVALID_TOKEN);
  }
};

module.exports = validateJWT;