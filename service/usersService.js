const { User } = require('../models');
const { validName, validEmail, validPassword } = require('../validations/validations');

const getAll = async () => {
    const users = await User.findAll();
    return users;
};
const validUnd = (email, password) => {
    if (password === undefined) return '"password" is required';
    if (email === undefined) return '"email" is required';
    if (validEmail(email) === false) {
        return '"email" must be a valid email';
    }
    return false;
};
const createUser = async (user) => {
    const { displayName, email, password } = user;
    if (typeof (validUnd(email, password)) === 'string') return validUnd(email, password);
    if (!validName(displayName)) return '"displayName" length must be at least 8 characters long';
    if (!validPassword(password)) return '"password" length must be 6 characters long';
    if (await User.findOne({ where: { email } }) !== null) return 'User already registered';
    const response = await User.create(user);
    return response;
};
module.exports = { createUser, getAll };