const { StatusCodes } = require('http-status-codes');
const userService = require('../services/UserService');

const postNewUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { token } = req;
    const payload = { displayName, email, password, image };

    const newUser = await userService.newUser(payload);
    
    if (newUser.error) {
      return res.status(StatusCodes.CONFLICT).json({ message: newUser.error.message });
    }
    
    return res.status(StatusCodes.CREATED).json({ token });
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro tente mais tarde' });
  }
};

module.exports = postNewUser;
