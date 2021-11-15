require('dotenv').config();
const jwt = require('jsonwebtoken');
const LoginService = require('../services/LoginService');

const secret = process.env.SECRET || 'naruto123';

const jwtCfg = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await LoginService.userLogin(email, password);

    if (response.message) {
      return res.status(400).json(response);
    }

    const { id, displayName, image } = response;
    const payload = { id, displayName, email, image };
    const token = jwt.sign(payload, secret, jwtCfg);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  userLogin,
};
