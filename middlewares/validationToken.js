const jwt = require('jsonwebtoken');

const SECRET = '123456';

const validateJWT = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next('missingAuthToken');
  }
  jwt.verify(authorization, SECRET, (err, decoded) => {
    if (decoded) {
      const { id } = decoded;
      req.idUser = id;
    }
    if (err) {
      next('expiredToken');
    }
  });
  next();
};

module.exports = validateJWT;