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

const getAll = async (_req, res) => {
 try {
  const users = await UserService.getAllUserService();
  return res.status(StatusCodes.OK).json(users);
} catch (error) {
  console.log(`[USER CONTROLLER] : buscar => ${error}`);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
}
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserByIdService(id);
    if (user.isError) return res.status(user.status).json(user.err);
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const userRemove = async (req, res) => {
  try {
    await UserService.removeUserService(req.user.id);
    
   return res.status(StatusCodes.NO_CONTENT);
  } catch (err) {
    // console.log(err);
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  userLogin,
  getAll,
  getUserById,
  userRemove
};
