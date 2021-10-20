const jwt = require('jsonwebtoken');
// const { StatusCodes } = require('http-status-codes');
require('dotenv').config();
const { 
  createUserServices,
  getAllUsersServices,
  findUserServices,
} = require('../services/usersServices');

const JWT_SECRET = 'lucas-lotar-secret';

const createUser = async (req, res) => {
  try {
    const response = await createUserServices(req.body);
    
    if (response.isError) res.status(response.code).json({ message: response.message });
    
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    const token = jwt.sign({ data: response }, JWT_SECRET, jwtConfig);

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const response = await getAllUsersServices();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const findUser = async (req, res) => {
  try {
    const response = await findUserServices(req.params.id); 
      if (response.isError) res.status(404).json({ message: response.message });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  findUser,
//   editStudent,
//   excludeStudent,
};
