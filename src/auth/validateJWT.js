require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED, NOT_FOUND } = require('http-status');

const secret = process.env.JWT_SECRET || 'semsenhabjs';

const validateJWT = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);

    if (!decoded.user) return res.status(NOT_FOUND).json({ message: 'User not found' });

    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(UNAUTHORIZED).json({ message: error.message });
  }
};

module.exports = {
  validateJWT,
};
