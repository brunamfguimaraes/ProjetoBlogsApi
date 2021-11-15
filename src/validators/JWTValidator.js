require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../../models');

const secret = process.env.SECRET || 'naruto123';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const valid = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: valid.email } });

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);

    return res.status(401).json({ message: error.message });
  }
};
