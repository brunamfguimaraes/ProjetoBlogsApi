const { StatusCodes } = require('http-status-codes');
const userServices = require('../services/userServices');
const { User } = require('../models');
const { generateToken } = require('../middlewares/jwt');

const addUser = async (req, res) => {
  try {
    const user = req.body;    
    const userExists = await User.findOne({ where: { email: user.email } });
    if (userExists) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'User already registered' });
    }

    const response = await userServices.addUser(user);
    if (!response.id) {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const token = generateToken(response.id, response.email);
    return res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await userServices.getAll();
    if (response) return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const findUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userServices.findUser(id);
    if (response) return res.status(StatusCodes.OK).json(response);
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'User does not exist' });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

module.exports = {
  addUser,
  findUser,
  getAll,
};