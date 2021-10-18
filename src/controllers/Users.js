const {
  OK,
  CREATED,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
} = require('http-status');
const Users = require('../services/Users');

const createUser = async (req, res) => {
  try {
    const { body: userData } = req;
    const result = await Users.createUser(userData);

    if (result.message && result.conflict) {
      return res.status(CONFLICT).json({ message: result.message });
    }

    return result.message
      ? res.status(BAD_REQUEST).json(result)
      : res.status(CREATED).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const result = await Users.getAllUsers();
    
    return res.status(OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Users.getUserById(id);

    return result.message
      ? res.status(NOT_FOUND).json(result)
      : res.status(OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = { createUser, getAllUsers, getUserById };