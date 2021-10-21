const jwt = require('jsonwebtoken');
// const { StatusCodes } = require('http-status-codes');
const { createUserServices, getAllUsersServices } = require('../services/usersServices');
require('dotenv').config();

// const { JWT_SECRET } = process.env;
// const JWT_SECRET = 'projectBlogsAPI';

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

// const editStudent = async (req, res) => {
//   try {
//     const response = await usersServices.editStudent(req.params, req.body);
//     if (response.isError) {
//       return res.status(response.code).json({ message: response.message });
//     }
//     return res.status(StatusCodes.OK).json({ message: response.message });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

module.exports = {
  createUser,
  getAllUsers,
//   editStudent,
//   excludeStudent,
};
