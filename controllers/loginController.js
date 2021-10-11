const STATUS_OK = {
    CREATED: 201,
};

const loginUser = async (req, res) => {
    const nada = 'nada';
   return res.status(STATUS_OK.CREATED).json({ nada });
};

module.exports = {
    loginUser,
};