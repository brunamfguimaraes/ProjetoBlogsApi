const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

const generateJWT = async (_req, res, next) => {
try {
  // const { _id, name, role } = await getByEmail(email);
  const token = jwt.sign('dados do banco', secret, jwtConfig);
  res.status(200).json({ token });
  next();
} catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = generateJWT;
