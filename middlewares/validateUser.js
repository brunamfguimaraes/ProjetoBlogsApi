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

const messagePassword = {
    message: '"password" length must be 6 characters long',
};

const messagePasswordIsRequired = {
    message: '"password" is required',
};

const messageEmailAlreadyExists = {
    message: 'User already registered',
};

const validateIfEmailIsAlreadyExists = async (req, res, next) => {
    const { email } = req.body;
    console.log(req.body);

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
    console.log(typeof email);
    if (!email) {
        console.log('cheguei');
        return res.status(400).json(messageEmailIsRequired);
    }
    
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (!email.match(emailRegex)) {
        console.log('passei');
        return res.status(400).json(messageEmail);
    }

    next();
};

const validatePassword = (req, res, next) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json(messagePasswordIsRequired);
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
};
