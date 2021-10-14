const { User } = require('../models');

const validateName = (displayName) => {
    if (!displayName || displayName.length < 8) {
        return false;
    }

    return true;
};

const validateField = (email, password) => {
    if (!email) {
        return { message: 'email is required' };
    }

    if (!password) {
        return { message: 'password is required' };
    }
   
    return true;
};

const validateEmail = (email) => {
    const regexEmail = /\b[\w.-]+@[\w.-]+.\w{2,4}\b/;
    if (!regexEmail.test(email)) {
        return false;
    }
    
    return true;
};

const validatePassword = (password) => {
    if (!password || password.length !== 6) {
       return false; 
    }

    return true;
};

const createUser = async ({ displayName, email, password, image }) => {
    const validName = validateName(displayName);
    const validField = validateField(email, password);
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    const existEmail = await User.findOne({ email });
    if (!validName) {
        return { message: 'displayName length must be at least 8 characters long' };
    }
    if (validField !== true) return { message: validField.message };
    if (!validEmail) { return { message: 'email must be a valid email' }; }
    if (!validPassword) { return { message: 'password length must be 6 characters long' }; }
    if (existEmail) { return { message: 'User already registered' }; }
    const user = await User.create({ displayName, email, password, image });
    return user;
};

module.exports = { createUser };
