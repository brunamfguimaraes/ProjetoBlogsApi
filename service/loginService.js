const { User } = require('../models');
const validations = require('../validations/validations');

const validUndEmail = (email) => {
    if (email === undefined) return '"email" is required';
    if (email.length === 0) return '"email" is not allowed to be empty';
    if (email === undefined) return '"email" is required';
    return false;
};
const validUndPasswd = (password) => {
    if (password === undefined) return '"password" is required';
    if (password.length === 0) return '"password" is not allowed to be empty';

    return false;
};
const login = async ({ email, password }) => {
    if (typeof (validUndEmail(email)) === 'string') return validUndEmail(email);
    if (typeof (validUndPasswd(password)) === 'string') return validUndPasswd(password);

    const find = await User.findOne({ where: { email } });
    if (find === null) return 'Invalid fields';
    if (validations.validLogin(email, password, find)) {
        return find;
    }
    return 'user invalid';
};

module.exports = { login };