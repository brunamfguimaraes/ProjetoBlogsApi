const usersModel = require('../models/index');

const getAll = async () => {
    const users = await usersModel.getAll();
    return users;
};
const createUser = async (user) => {
    console.log('oii');
    const response = await usersModel.create(user);
    return response;
};

module.exports = { createUser, getAll };