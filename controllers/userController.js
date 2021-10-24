const jwt = require('jsonwebtoken');
const { User } = require('../models');

const segredo = 'meusupersegredo';

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await User.create({ displayName, email, password, image });
  
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, segredo, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = {
  createUser,
};
