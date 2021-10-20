const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();
const { 
  createUserServices,
  getAllUsersServices,
  findUserServices,
} = require('../services/usersServices');

const createUser = async (req, res) => {
  try {
    const response = await createUserServices(req.body);
    
    if (response.isError) res.status(response.code).json({ message: response.message });
    
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    const token = jwt.sign({ data: response }, process.env.JWT_SECRET, jwtConfig);

    return res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await getAllUsersServices();
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const findUser = async (req, res) => {
  try {
    const response = await findUserServices(req.params.id); 
      if (response.isError) res.status(StatusCodes.NOT_FOUND).json({ message: response.message });
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  findUser,
//   editStudent,
//   excludeStudent,
};
