const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/userService');

const createUser = async (req, res) => {
 console.log('[USER CONTROLLER] : CHAMOU O MÉTODO CRIAR UM USER');
   try {
      const { displayName, email, password, image } = req.body;
      const result = await UserService.createUser(displayName, email, password, image);
      if (result.isError) return res.status(result.status).json(result.err);
      return res.status(StatusCodes.CREATED).json({ token: result });
   } catch (error) {
    console.log(`[USER CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
    createUser,  
}; 