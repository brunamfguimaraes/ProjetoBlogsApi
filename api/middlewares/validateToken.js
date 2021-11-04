const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const { User } = require('../../models/index');

const UNAUTHORIZED = 'unauthorized';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next({ codeErr: UNAUTHORIZED, errMsg: 'Token not found' });

  try {
    const { email } = jwt.verify(token, secret);

    const user = await User.findOne({ where: { email } });
    if (!user) return next({ codeErr: UNAUTHORIZED, errMsg: 'Expired or invalid token' });

    next();
  } catch (error) {
    next({ codeErr: UNAUTHORIZED, errMsg: 'Expired or invalid token' });
  }
};

module.exports = validateToken;
