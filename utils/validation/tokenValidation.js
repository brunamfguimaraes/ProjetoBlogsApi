const jwt = require('jsonwebtoken');

const errorMessage = require('../errosCode/erroMessage');

const secret = process.env.JWT_SECRET;

const err = (statusCode) => ({ statusCode });

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw err(errorMessage.JWT_MALFORMED);
  }
};

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) throw err(errorMessage.MISSING_TOKEN);

  const payload = await verifyToken(token);

  req.userInfo = payload;
  next();
};
