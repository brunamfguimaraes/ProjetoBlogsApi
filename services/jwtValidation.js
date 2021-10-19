const jwt = require('jsonwebtoken');

const secret = 'mySuperPassword';

const UNAUTHORIZED = 401;

const jwtValidation = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const decodification = jwt.verify(authorization, secret);
    req.user = decodification.data;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message:
    'jwt malformed' });
  }
};

module.exports = {
  jwtValidation,
};
