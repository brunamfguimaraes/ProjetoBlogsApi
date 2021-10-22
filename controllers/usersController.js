const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { 
  createUserServices,
  getAllUsersServices,
  findUserServices, 
} = require('../services/usersServices');
require('dotenv').config();

// const { JWT_SECRET } = process.env;
// const JWT_SECRET = 'projectBlogsAPI';
//

const createUser = async (req, res) => {
  try {
    const response = await createUserServices(req.body);
    
    if (response.isError) return res.status(response.code).json({ message: response.message });

    // console.log(response.newUser);
    
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    const token = jwt.sign({ data: response.newUser }, process.env.JWT_SECRET, jwtConfig);

    return res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await getAllUsersServices();
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const findUser = async (req, res) => {
  try {
    const response = await findUserServices(req.params.id); 
    if (response.isError) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: response.message }); 
    }

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  findUser,
//   excludeStudent,
};
