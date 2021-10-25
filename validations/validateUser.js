const { User } = require('../models');

const messageDisplayName = {
    message: '"displayName" length must be at least 8 characters long',
};

const messageEmail = {
    message: '"email" must be a valid email',
};

const messageEmailIsRequired = {
    message: '"email" is required',
};

const messageEmailEmpty = {
    message: '"email" is not allowed to be empty',
};

const messagePassword = {
    message: '"password" length must be 6 characters long',
};

const messagePasswordIsRequired = {
    message: '"password" is required',
};

const messagePasswordEmpty = {
    message: '"password" is not allowed to be empty',
};

const messageEmailAlreadyExists = {
    message: 'User already registered',
};

const messageUserDoesntExist = {
    message: 'User does not exist',
};

const verifyIfUserExists = async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
        return res.status(404).json(messageUserDoesntExist);
    }

    next();
};

const validateIfEmailIsAlreadyExists = async (req, res, next) => {
    const { email } = req.body;

    const verifyEmail = await User.findOne({
        where: { email },
    });

    if (verifyEmail) {
        return res.status(409).json(messageEmailAlreadyExists);
    }

    next();
};

const validateDisplayName = (req, res, next) => {
    const { displayName } = req.body;

    if (displayName.length < 8) {
        return res.status(400).json(messageDisplayName);
    }

    next();
};

const validateEmail = (req, res, next) => {
    const { email } = req.body;

    if (typeof email === 'undefined') {
        return res.status(400).json(messageEmailIsRequired);
    }

    if (email === '') {
        return res.status(400).json(messageEmailEmpty);
    }
    
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (!email.match(emailRegex)) {
        return res.status(400).json(messageEmail);
    }

    next();
};

const validatePassword = (req, res, next) => {
    const { password } = req.body;

    if (typeof password === 'undefined') {
        return res.status(400).json(messagePasswordIsRequired);
    }

    if (password === '') {
        return res.status(400).json(messagePasswordEmpty);
    }

    if (password.length !== 6) {
        return res.status(400).json(messagePassword);
    }

    next();
};

module.exports = {
    validateIfEmailIsAlreadyExists,
    validateDisplayName,
    validateEmail,
    validatePassword,
    verifyIfUserExists,
};
