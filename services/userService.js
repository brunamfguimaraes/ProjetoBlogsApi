const { User } = require('../models');

const messageUserNotFound = {
    message: 'Invalid fields',
};

const addNewUser = async (displayName, email, password, image) => {
    const addUser = await User.create({
        displayName,
        email,
        password,
        image,
    });

    return addUser;
};

const loginIn = async (email, password) => {
    const login = await User.findOne({
        where: { email, password },
    });

    if (!login) {
        return messageUserNotFound;
    }
    // console.log(login);

    return login;
};

const getAllUsers = async () => {
    const allusers = User.findAll();

    return allusers;
};

const getUserById = async (id) => {
    const getUser = await User.findOne({ where: { id } });

    return getUser;
};

module.exports = {
    addNewUser,
    loginIn,
    getAllUsers,
    getUserById,
};
