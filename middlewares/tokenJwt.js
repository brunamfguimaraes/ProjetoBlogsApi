const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

const generateJWT = async (req, res) => {
try {
  const user = { email: req.body.email };
  const token = jwt.sign(user, secret, jwtConfig);
  res.status(req.statusCode).json({ token });
} catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = generateJWT;
