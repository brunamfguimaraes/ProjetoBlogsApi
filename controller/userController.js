const userService = require('../services/userServices');

const JWTgenerate = require('../middlewares/JWTgenerate');

const codes = require('../middlewares/codes');

const secret = 'meusecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const create = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.create(userData);

    const token = JWTgenerate({ user }, jwtConfig, secret);

    return res.status(codes.created).json({ token });
  } catch (error) {
    const { code, message } = error;
    return res.status(code).json({ message });
  }
};

module.exports = { create };