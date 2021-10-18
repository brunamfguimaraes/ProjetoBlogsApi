const HTTP_REST = require('../HTTPErrosAndMessages');

const { statusCode, message } = HTTP_REST;

const userService = require('../service/usersService');

// Controller para Adicionar usuário!
// Falta apenas Adicionar o usuário e enviar o Token!
const addUser = async (req, res) => {
    const user = req.body;
    const response = await userService.addUser(user);
    const { token } = response;
    if (token) {
        return res.status(statusCode.CREATED).json(response);
    }
   return res.status(statusCode.CONFLICT).json(response);
};

// Falta Listar todos usuários e depois enviar o status 200
const getAllUser = async (req, res) => {
    const allUsers = await userService.getAllUsers();
    const allUsersMapped = allUsers.map((user) => user.dataValues);
    return res.status(statusCode.OK).json(allUsersMapped);
};

// Falta apenas Listar o usuário pelo ID Se ele não existir um 404
const getUserById = async (req, res) => {
    const userById = await userService.getUserBydId(req.params.id);
    if (!userById) {
        return res.status(statusCode.NOT_FOUND).json({ message: message.USER_NOT_EXISTS });
    }
   return res.status(statusCode.OK).json(userById);
};

module.exports = {
    addUser,
    getAllUser,
    getUserById,
};