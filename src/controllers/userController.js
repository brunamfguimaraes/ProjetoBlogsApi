const {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('http-status');

const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const userData = { displayName, email, password, image };

    const result = await userService.createUser(userData);

    if (result.message && result.conflict) return res.status(CONFLICT).json(result);
    if (result.message) return res.status(BAD_REQUEST).json(result);

    return res.status(CREATED).json({ token: result });
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();

    return res.status(OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await userService.getById(id);
    if (result.message) return res.status(NOT_FOUND).json(result);

    return res.status(OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const removeUser = async (req, res) => {
  try {
    const { userId } = req;
    await userService.removeUser(userId);

    return res.status(NO_CONTENT).send();
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getById,
  removeUser,
};