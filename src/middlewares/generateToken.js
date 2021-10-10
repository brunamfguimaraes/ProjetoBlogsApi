require('dotenv').config();
const jwt = require('jsonwebtoken');

const password = process.env.JWT_SECRET;

function generateToken(req, res, next) {
  try {
    const { email } = req.body;

    const jwtConfig = {
      expiresIn: '15d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ email }, password, jwtConfig);
    req.token = token;

    next();
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

module.exports = generateToken;