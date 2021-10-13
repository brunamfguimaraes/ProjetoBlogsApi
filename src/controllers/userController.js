const { CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('http-status');

const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const userData = { displayName, email, password, image };

    const result = userService.createUser(userData);

    if (result.message) return res.status(BAD_REQUEST).json(result);

    return res.status(CREATED).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

module.exports = {
  createUser,
};