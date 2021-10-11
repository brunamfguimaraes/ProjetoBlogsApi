const STATUS_OK = {
    CREATED: 200,
};

const addCategory = async (req, res) => {
    const nada = 'nada';
   return res.status(STATUS_OK.CREATED).json({ nada });
};

module.exports = {
    addCategory,
};