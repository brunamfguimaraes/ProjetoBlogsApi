const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const { SECRET } = process.env.SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
    const { email } = req.body;
    const userLogged = await User.findOne({ where: { email } });
    if (!userLogged) res.status(400).json({ message: 'Invalid fields' });
    
    const token = jwt.sign({ userLogged }, SECRET, jwtConfig);
    res.status(200).json({ token }); 
};

module.exports = {
  login,
};