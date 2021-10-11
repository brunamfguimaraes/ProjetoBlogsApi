const STATUS_OK = {
    CREATED: 201,
};

// Controller para Adicionar usuário!
// Falta apenas Adicionar o usuário e enviar o Token!
const addUser = async (req, res) => {
    const nada = 'nada';
    // console.log(req.body);
   return res.status(STATUS_OK.CREATED).json({ nada });
};

// Falta Listar todos usuários e depois enviar o status 200
const getAllUser = async (req, res) => {
    const nada = 'aaaad';
    // console.log(req.body);
   return res.status(STATUS_OK.CREATED).json({ nada });
};

// Falta apenas Listar o usuário pelo ID Se ele não existir um 404
const getUserById = async (req, res) => {
    const nada = 'sasdsd';
    // console.log(req.body);
   return res.status(STATUS_OK.CREATED).json({ nada });
};

module.exports = {
    addUser,
    getAllUser,
    getUserById,
};