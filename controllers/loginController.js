const jwt = require('jsonwebtoken');
const loginServices = require('../services/loginServices');
require('dotenv');

const secret = process.env.JWT_SECRET;
const login = async (req, res, next) => {
  try {
    const user = await loginServices.login(req.body);
    if (user.error) next(user);
    const jwtConfig = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };
  
    const token = jwt.sign({ data: user }, secret, jwtConfig);
  
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    next(500);
  }
};

module.exports = {
  login,
};