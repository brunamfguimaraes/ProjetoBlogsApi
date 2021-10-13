const { CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST, CONFLICT, OK } = require('http-status');

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

module.exports = {
  createUser,
  getAllUsers,
};