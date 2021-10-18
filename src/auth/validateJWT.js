require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('http-status');

const secret = process.env.JWT_SECRET || 'semsenhabjs';

const validateJWT = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });

  try {
    const { displayName: name, loggedEmail: email, userId } = jwt.verify(token, secret);

    req.user = { name, email, userId };
    next();
  } catch (error) {
    console.log(error);
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateJWT,
};
