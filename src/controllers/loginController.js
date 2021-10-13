require('dotenv').config();
const jwt = require('jsonwebtoken');
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('http-status');
const loginService = require('../services/loginService');

const secret = process.env.SECRET || 'notSoSecret';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginService.userLogin(email, password);
    if (result.message) return res.status(BAD_REQUEST).json(result);

    const { id, displayName, image } = result;
    const payload = { id, displayName, email, image };

    const token = jwt.sign(payload, secret, jwtConfig);

    res.status(OK).json({ token });
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  userLogin,
};