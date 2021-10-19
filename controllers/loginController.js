const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { loginUser } = require('../services/loginServices');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  try {
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    const response = await loginUser(req.body);
    
    if (response.isError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: response.message }); 
    }
    
    const token = jwt.sign({ data: response }, JWT_SECRET, jwtConfig);
    return res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { login };