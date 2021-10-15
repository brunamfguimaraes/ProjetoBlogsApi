const jwt = require('jsonwebtoken');
const Error = require('../helpers/errors');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const { authorization } = req.headers;
  const { code } = Error.unauthorized();

  if (!authorization) {
    return res.status(code).json({
      message: 'Token not found',
    });
  }
  try {
    req.user = jwt.verify(authorization, secret);
    return next();
  } catch (error) {
    return res.status(code).json({
      message: 'Expired or invalid token',
    });
  }
};

module.exports = validateJWT;