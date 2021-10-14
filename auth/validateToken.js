const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) { return next({ status: 401, message: 'Token not found' }); }

  jwt.verify(token, secret, (err, decoded) => {
    if (decoded) {
      const { id } = decoded;
      console.log(`${id} sou o id`);
      req.userId = id;
    }

    if (err) return next({ status: 401, message: 'Expired or invalid token' }); 
  });
  next();
};

module.exports = { validateJWT };