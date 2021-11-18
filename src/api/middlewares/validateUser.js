const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/ApiError');

const { User } = require('../../models');

const secret = process.env.JWT_SECRET;

const checkIfUserExist = async (email, _next) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new ApiError('Token not found', 401));
  }

  try {
    const decoded = jwt.verify(authorization, secret);
    const { email } = decoded;

    const user = await checkIfUserExist(email);

    if (!user) {
      return next(new ApiError('Expired or invalid token', 404));
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  verifyToken,
};
