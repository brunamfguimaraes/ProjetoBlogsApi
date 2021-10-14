const { User } = require('../models');

const EmailValidation = async (req, res, next) => {
    const { email } = req.body;

    // https://qastack.com.br/programming/2507030/email-validation-using-jquery
    const regexValido = /\w+@\w+/g.test(email);

    if (!email || email === undefined) {
        return res.status(400).json({ message: '"email" is required' });
    }
    if (!regexValido) {
        return res.status(400).json({ message: '"email" must be a valid email' });
    }
    next();
};

const EmailExist = async (req, res, next) => {
    const { email } = req.body; 

    const user = await User.findOne({ where: { email } });

    if (user) { 
        return res.status(409).json({ message: 'User already registered' }); 
    }    
    next();
};

const PasswordValidation = async (req, res, next) => {
    const { password } = req.body;

    if (!password || password === undefined) {
        return res.status(400).json({ message: '"password" is required' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: '"password" length must be 6 characters long' });
    }
    next();
};

const NameValidation = async (req, res, next) => {
    const { displayName } = req.body;

    if (displayName.length < 8) {
        return res.status(400)
        .json({ message: '"displayName" length must be at least 8 characters long' });
    }
    next();
};

const emptyEmail = async (req, res, next) => {
    const { email } = req.body;
    
    if (email === '') {
        return res.status(400).json({ message: '"email" is not allowed to be empty' });
    }
    if (!email || email === undefined) {
        return res.status(400).json({ message: '"email" is required' });
    }
    next();
};

const emptyPassword = async (req, res, next) => {
    const { password } = req.body;

    if (password === '') {
        return res.status(400).json({ message: '"password" is not allowed to be empty' });
    }
    if (!password || password === undefined) {
        return res.status(400).json({ message: '"password" is required' });
    }
    next();
};

module.exports = {
    NameValidation,
    EmailValidation,
    PasswordValidation,
    EmailExist,
    emptyEmail,
    emptyPassword,

};