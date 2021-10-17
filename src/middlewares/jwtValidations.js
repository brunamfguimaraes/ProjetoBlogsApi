const jwt = require('jsonwebtoken');
const { code, errorMessage } = require('../schema/index');
require('dotenv/config');

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(code.HTTP_UNAUTHORIZED).json({ message: errorMessage('noToken') });
  }

  next();
};

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;

  try {
    jwt.verify(token, secret);
  } catch (e) {
    return res.status(code.HTTP_UNAUTHORIZED).json({ message: errorMessage('invalidToken') });
  }
  next();
};

module.exports = {
  checkToken,
  validateJWT,
};
