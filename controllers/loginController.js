const jwt = require('jsonwebtoken');
const loginServices = require('../services/loginServices');
require('dotenv');

const secret = process.env.JWT_SECRET;
const login = async (req, res) => {
  try {
    const user = await loginServices.login(req.body);
    if (user.error) {
      const { status, message } = user.error;
      return res.status(status).json({ message });
    }
    const jwtConfig = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };
  
    const token = jwt.sign({ data: user }, secret, jwtConfig);
  
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went Wrong. Please Try again');
  }
};

module.exports = {
  login,
};