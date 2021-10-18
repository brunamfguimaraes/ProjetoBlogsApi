require('dotenv/config');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const secret = process.env.JWT_SECRET;

const createJWT = async (req, res, next) => {
  try {
    const { email } = req.body;
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
  
    const token = jwt.sign({ email }, secret, jwtConfig);
    req.token = token;

    next();
  } catch (e) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Error generating token' });
  }
};

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const payload = jwt.verify(token, secret);

    req.user = payload;
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = { validateJWT, createJWT };
