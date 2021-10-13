const jwt = require('jsonwebtoken');
require('dotenv').config();
const { postLoginService } = require('../services');

const postLoginController = async (req, res, next) => { 
  const { email, password } = req.body;
  
  const errorOnPostLogin = await postLoginService(email, password);
  if (errorOnPostLogin) {
    return next(errorOnPostLogin);
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({}, process.env.JWT_SECRET, jwtConfig);

  res.status(200).json({ token });
};

module.exports = { postLoginController };
