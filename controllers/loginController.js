const STATUS_OK = {
    CREATED: 201,
};

// Preciso Validar o usuario fazer o login e entregar o token
const loginUser = async (req, res) => {
    const nada = 'nada';
   return res.status(STATUS_OK.CREATED).json({ nada });
};

module.exports = {
    loginUser,
};