const { StatusCodes } = require('http-status-codes');
const { createUserServices } = require('../services/usersServices');

const createUser = async (req, res) => {
  try {
    const response = await createUserServices(req.params, req.body);
    if (response.isError) {
      return res.status(response.code).json({ message: response.message });
    }
    return res.status(StatusCodes.CREATED).json({ message: response.message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// const getAllStudents = async (_req, res) => {
//   try {
//     const students = await usersServices.getAll();
//     return res.status(StatusCodes.OK).json(students);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

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
//   getAllStudents,
//   editStudent,
//   excludeStudent,
};
