const User = require('../models/user');

module.exports = (_req, res) => {
const checkUserExists = async (email, password) => {
    const check = await User.findOne({ where: { email, password } });
    if (check === null) {
    return res.status(400).json({
        message: 'invalid fields',
        });
    }
};
return checkUserExists;
};