require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'naruto123';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const valid = jwt.verify(token, secret);
    const { id } = valid;
    req.userId = id;

    next();
  } catch (error) {
    console.error(error.message);

    return res.status(401).json({ message: error.message });
  }
};
