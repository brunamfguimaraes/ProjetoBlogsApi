require('dotenv/config');
const jwt = require('jsonwebtoken');
const Error = require('../utils/createObjError');

const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const err = (msg) => Error.unauthorized(msg);
  try {
    const { authorization: token } = req.headers;
    if (!token) next(err('Token not found'));
    req.user = jwt.verify(token, secret);
    return next();
  } catch (error) {
    return next(err('Expired or invalid token'));
  }
};
