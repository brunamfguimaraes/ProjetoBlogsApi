const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/UserService');

const postNewUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { token } = req;
    const payload = { displayName, email, password, image };

    const newUser = await UserService.newUser(payload);
    
    if (newUser.error) {
      return res.status(StatusCodes.CONFLICT).json({ message: newUser.error.message });
    }
    
    return res.status(StatusCodes.CREATED).json({ token });
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro tente mais tarde' });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await UserService.getAll();
    return res.status(StatusCodes.OK).json(users);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { postNewUser, getAll };
