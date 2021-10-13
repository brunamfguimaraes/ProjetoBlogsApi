const jwt = require('jsonwebtoken');
const { ERROR_MISSING_TOKEN, ERROR_EXPIRES_TOKEN } = require('../services/msgErrors');

const { JWT_SECRET } = process.env || 'minhaSenhaBlog';

const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(ERROR_MISSING_TOKEN.status).json({ message: ERROR_MISSING_TOKEN.message });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.data;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(ERROR_EXPIRES_TOKEN.status).json({ message: ERROR_EXPIRES_TOKEN.message });
  }
};

module.exports = tokenValidation;
