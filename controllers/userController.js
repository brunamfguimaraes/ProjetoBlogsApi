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

module.exports = {
    addUser,
};