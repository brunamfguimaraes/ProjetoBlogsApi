const jwt = require('jsonwebtoken');
const Error = require('../helpers/errors');
require('dotenv');

const secret = process.env.SECRET;

const tokenValidator = async (req, res, next) => {
  const { authorization } = req.headers;
  const { code } = Error.unauthorized();

  if (!authorization) return res.status(code).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(authorization, secret);

    req.user = decoded.data;

    next();
  } catch (error) {
    console.log(error.message);
    res.status(code).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { tokenValidator };