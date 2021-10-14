const { User } = require('../models');

const validateField = (email, password) => {
    if (!email) {
        return { message: '"email" is required' };
    }

    if (!password) {
        return { message: '"password" is required' };
    }
   
    return true;
};

const loginUser = async ({ email, password }) => {
    const validField = validateField(email, password);
    if (validField !== true) return { message: validField.message };
    const login = await User.findOne({ where: { email, password } });
    return login;
};

module.exports = { loginUser };
