const { User } = require('../models');

const EmailIsRequired = {
    status: 400, message: '"email" is required', 
};

const validateDisplayName = (displayName) => {
    if (displayName.length < 8 || typeof displayName !== 'string') {
        return {
            status: 400, 
            message: '"displayName" length must be at least 8 characters long' };
    }
    return true;
};

const validateEmail = (email) => {
    const reg = /\S+@\S+\.\S+/;
    if (!email || typeof email !== 'string') {
        return EmailIsRequired;
    }

    if (!reg.test(email)) {
        return {
            status: 400, message: '"email" must be a valid email', 
        };
    }
    return true;
};

const verifyPassword = (password) => {
    if (!password || typeof password !== 'string') {
        return {
            status: 400, message: '"password" is required',
        };
    }
    if (password.length < 6) {
        return {
            status: 400, message: '"password" length must be 6 characters long',
        };
    }
    return true;
};

const verifyLoginPassword = (password) => {
    console.log(password);
    if (password === undefined) {
        return {
            status: 400, message: '"password" is required',
        };
    }

    if (password.length === 0) {
        return {
            status: 400, message: '"password" is not allowed to be empty',
        };
    }
    return true;
};

const validateIfEmailExists = async (email) => {
    if (!email || typeof email !== 'string') {
        return EmailIsRequired;
    }
    const result = await User.findOne({ where: { email } });
    if (result !== null) {
        return { status: 409, message: 'User already registered' };
    }
    return true;
  };

const validateIfLoginEmailExists = async (email) => {
    if (email === undefined || typeof email !== 'string') {
        return EmailIsRequired;
    }
    if (email.length === 0) return { status: 400, message: '"email" is not allowed to be empty' }; 
    const result = await User.findOne({ where: { email } });
    if (result === null) {
        return { status: 400, message: 'Invalid fields' };
    }
    return true;
};

const validateFilds = async (displayName, email, password) => {
    const resultvalidateDisplayName = validateDisplayName(displayName);
    const resultvalidateEmail = validateEmail(email);
    const resultverifyPassword = verifyPassword(password);
    const resultvalidateIfEmailExists = await validateIfEmailExists(email);
    if (resultvalidateDisplayName !== true) return resultvalidateDisplayName;
    if (resultvalidateEmail !== true) return resultvalidateEmail;
    if (resultverifyPassword !== true) return resultverifyPassword;
    if (resultvalidateIfEmailExists !== true) return resultvalidateIfEmailExists;  

    return true;
};

const create = async (displayName, email, password, image) => {
    const resultValidateFilds = await validateFilds(displayName, email, password);
    if (resultValidateFilds !== true) {
        return resultValidateFilds;
    } 
    await User.create({ displayName, email, password, image });

    return { status: 201 };
};

const validateLogin = async (email, password) => {
    const resultverifyPassword = verifyLoginPassword(password);
    const resultvalidateIfEmailExists = await validateIfLoginEmailExists(email);
    if (resultverifyPassword !== true) return resultverifyPassword;
    if (resultvalidateIfEmailExists !== true) return resultvalidateIfEmailExists;    

    return true;
};

const login = async (email, password) => {
    const resultValidateLogin = await validateLogin(email, password);
    if (resultValidateLogin !== true) {
        return resultValidateLogin;
    } 
    return { status: 200 };
};

module.exports = {
    login,
    create,
};