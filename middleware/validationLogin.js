const RequestError = require('../helper/customErrors');
const { User } = require('../models');

let err;

const validationLoginEmail = (res, email) => {
    if (email === '') {
            err = {
                status: 400,
                message: '"email" is not allowed to be empty',
                };
            RequestError(res, err);
    }
};

const validationLoginPassword = (res, password) => {
    if (password === '') {
            err = {
                status: 400,
                message: '"password" is not allowed to be empty',
                };
            RequestError(res, err);
    }
};

const validationLoginUser = async (res, email, password) => {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
        err = {
            status: 400,
            message: 'Invalid fields',
            };
        RequestError(res, err);
    }
    return user;
};

module.exports = { validationLoginEmail, validationLoginPassword, validationLoginUser };