const jwt = require('jsonwebtoken');
const { User } = require('../sequelize/models');
const Error = require('../helpers/errors');
require('dotenv');

const secret = process.env.JWT_SECRET;

const tokenValidator = async (req, res, next) => {
  const { authorization } = req.headers;
  const { code } = Error.unauthorized();

  if (!authorization) return res.status(code).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(authorization, secret);

    const { email } = decoded.data;

    const user = await User.findOne({ where: { email } });

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    res.status(code).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { tokenValidator };