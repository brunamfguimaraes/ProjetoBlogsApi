const { StatusCodes } = require('http-status-codes');

const UserService = require('../services/userService');

const create = async (req, res) => {
  try {
    const userData = req.body;
    
    const newUser = await UserService.createUser(userData);

    return res.status(StatusCodes.CREATED).json({ message: newUser });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  create,
};
