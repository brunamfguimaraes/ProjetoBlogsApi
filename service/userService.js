const { User } = require('../models');
const { createToken } = require('../authentication/token');

const createUser = async (req, res) => {
    console.log('createUser');
    const user = await User.create(req.body);
    console.log('user', user);
    const token = await createToken(user);
    console.log('token', token);
    return res.status(201).json(token);
};

const checkEmailExists = async (email, res) => {
    console.log('checkEmailExists');
    const check = await User.findOne({ where: { email } });
    if (check !== null) {
    return res.status(409).json({
        message: 'User already registered',
        });
    }
    return false;
};

const getAllUsers = async (_req, res) => {
    const check = await User.findAll();
    return res.status(200).json(check);
};

const getUserById = async (_req, res, id) => {
    const check = await User.findOne({ where: { id } });
    if (!check) {
        res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(check);
};

module.exports = { createUser, checkEmailExists, getAllUsers, getUserById };