const { verifyJWT } = require('./jwtFunctions');

const authValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const payload = verifyJWT(authorization);
    req.payload = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const authValid = async (token) => {
  try {
    const payload = await verifyJWT(token);
    return payload.email;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { authValidation, authValid };