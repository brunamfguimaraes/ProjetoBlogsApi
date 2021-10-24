const jwt = require('jsonwebtoken');
const { User } = require('../models');
const userService = require('../services/user');

const serverError = 'server error';
const secret = 'meutoken';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const create = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    try {
    const result = await userService.create(displayName, email, password, image);

    if (result.status === 201) {
      const userData = await User.findOne({ where: { email } });  
      const token = jwt.sign({ data: userData }, secret, jwtConfig);
      return res.status(result.status).json({ token });
    }

    return res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: serverError });
    }
  };

  module.exports = {
    create,
  };