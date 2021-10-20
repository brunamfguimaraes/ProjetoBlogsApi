const { StatusCodes } = require('http-status-codes');
// https://www.npmjs.com/package/http-status-codes coisa boa viu
const UserService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const result = await UserService.createUserService(displayName, email, password, image);
    if (result.isError) return res.status(result.status).json(result.err);
    return res.status(StatusCodes.CREATED).json({ token: result });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.userLogin(email, password);
    console.log(result, 'oque e isso');
    if (result.isError) return res.status(result.status).json(result.err);
    return res.status(StatusCodes.OK).json({ token: result });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  userLogin,
};
