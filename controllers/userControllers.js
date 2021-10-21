const { StatusCodes } = require('http-status-codes');
const { jwt, jwtConfiguration } = require('../middlewares/jwt');
const userServices = require('../services/userServices');
const { User } = require('../models');

const addUser = async (req, res) => {
  try {
    const user = req.body;
    const secret = process.env.JWT_SECRET;
    
    const userExists = await User.findOne({ where: { email: user.email } });
    if (userExists) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'User already registered' });
    }
    
    const response = await userServices.addUser(user);
    if (response !== null) {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    
    const token = jwt.sign({ email: user.email }, secret, jwtConfiguration);
    return res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  const response = await userServices.getAll();
  if (response) return res.status(StatusCodes.OK).json(response);
};

module.exports = {
  addUser,
  getAll,
};