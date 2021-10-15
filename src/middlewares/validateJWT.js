const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(`token: ${token}`);

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
      const payload = jwt.verify(token, secret);
      console.log(`payload: ${payload.data}`);
      
      req.user = payload.data;
      next();
  } catch (error) {
      return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
