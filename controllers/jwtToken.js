const jwt = require('jsonwebtoken');
const status = require('http-status');

// JWT //
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
//    //

const secretKey = process.env.JWT_SECRET;

const createJWT = (req, _res, next) => {
  const { email } = req.body;

  const userData = {
    email,
  };

  const token = jwt.sign({ data: userData }, secretKey, jwtConfig);
  req.jwtToken = { token };
  
  next();
};

const validJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    /* Através o método verify, podemos validar e decodificar o nosso JWT. */
    jwt.verify(token, secretKey); // payload
  
    next();
  } catch (err) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { createJWT, validJWT };