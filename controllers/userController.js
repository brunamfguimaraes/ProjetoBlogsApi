const HTTP_REST = require('../HTTPErrosAndMessages');

const { statusCode } = HTTP_REST;

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
    const nada = 'aaaad';
    // console.log(req.body);
   return res.status(statusCode.CREATED).json({ nada });
};

// Falta apenas Listar o usuário pelo ID Se ele não existir um 404
const getUserById = async (req, res) => {
    const nada = 'sasdsd';
    // console.log(req.body);
   return res.status(statusCode.CREATED).json({ nada });
};

module.exports = {
    addUser,
    getAllUser,
    getUserById,
};