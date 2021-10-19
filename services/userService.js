const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

// const jsonWebToken = async (user) => {
//     const { displayName } = user;

//     const jwtConfig = {
//         expiresIn: '7d',
//         algorithm: 'HS256',
//     };

//     const token = jwt.sign({ data: displayName }, SECRET.anchor, jwtConfig);

//     return token;
// };

const addNewUser = async (displayName, email, password, image) => {
    const addUser = await User.create({
        displayName,
        email,
        password,
        image,
    });

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };

    const token = jwt.sign({ data: addUser.displayName }, SECRET, jwtConfig);

    return token;
};

module.exports = {
    addNewUser,
    // jsonWebToken,
};
