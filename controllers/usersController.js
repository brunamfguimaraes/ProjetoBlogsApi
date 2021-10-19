const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { createUserServices /* getAllUsersServices */ } = require('../services/usersServices');
require('dotenv').config();

// const { JWT_SECRET } = process.env;
// const JWT_SECRET = 'projectBlogsAPI';

const createUser = async (req, res) => {
  try {
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    const response = await createUserServices(req.body);
    const token = jwt.sign({ data: response }, process.env.JWT_SECRET, jwtConfig);

    if (response.isError) return res.status(response.code).json({ message: response.message });

    return res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // const response = await getAllUsersServices();

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

// const excludeStudent = async (req, res) => {
//   try {
//     const response = await usersServices.excludeStudent(req.params);
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
