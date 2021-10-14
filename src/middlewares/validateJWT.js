require('dotenv').config();
const jwt = require('jsonwebtoken');
const AppError = require('../util/appError');
const codes = require('../util/httpCodes');
const messages = require('../util/errorMessages');

const secret = process.env.JWT_SECRET;

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new AppError(codes.unauthorized, messages.missingToken);

  try {
    const decoded = jwt.verify(token, secret);
    const { user } = decoded;

    req.user = user;

    return next();
  } catch (error) {
    console.log(error);
    throw new AppError(codes.unauthorized, messages.invalidToken);
  }
};
