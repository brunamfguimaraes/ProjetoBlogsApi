const STATUS_OK = {
    CREATED: 200,
};

const User = require('../models/usermodel');

const addCategory = async (req, res) => {
    const token = req.headers.authorization;
   return res.status(STATUS_OK.CREATED).json({ token });
};

module.exports = {
    addCategory,
};