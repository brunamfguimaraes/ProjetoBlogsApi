const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const SECRET = 'batatinhafrita123';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
    try {
      const { email } = req.body;
      const userLogged = await User.findOne({ where: { email } });
      if (!userLogged) return res.status(400).json({ message: 'Invalid fields' });

      const token = jwt.sign({ userLogged }, SECRET, jwtConfig);
      res.status(200).json({ token });
    } catch (e) {
      return res.status(500).json({ message: 'Erro ao logar' });
    }
};

module.exports = {
  login,
};