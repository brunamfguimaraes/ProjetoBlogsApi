const { User } = require('../models');
const { createToken } = require('../validations/validateToken');

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
    console.log(addUser);
    const payload = {
        // id: String(addUser.id),
        displayName,
        email,
        image,
    };

    const token = createToken(payload);

    return token;
};

const loginIn = async (em, pass) => {
    const login = await User.findOne({
        where: { email: em, password: pass },
    });

    if (!login) {
        return messageUserNotFound;
    }
    console.log(login);
    const { id, displayName, email, image } = login;

    const payload = {
        id,
        displayName,
        email,
        image,
    };

    const token = createToken(payload);

    return token;
};

const getAllUsers = async () => {
    // const validateToken = verifyToken(token);

    // if (validateToken.messege) {
    //     return validateToken;
    // }

    const users = User.findAll({ attributes: { exclude: ['password'] } });

    return users;
};

const getUserById = async (id) => {
    const getUser = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

    return getUser;
};

module.exports = {
    addNewUser,
    loginIn,
    getAllUsers,
    getUserById,
};
