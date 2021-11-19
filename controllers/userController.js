const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');
require('dotenv');

const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
};

const checkDisplayName = async (req, res, next) => {
    const { displayName } = req.body;
    console.log('entrei');
    const isValid = await userServices.checkDisplayName(displayName);
    if (!isValid) {
        return res.status(400).json(
            { 
                message: '"displayName" length must be at least 8 characters long', 
            },
        ); 
    }

    next();
};

const checkEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: '"email" is required' });
    }
    const isValid = userServices.checkEmail(email);
    if (!isValid) {
        return res.status(400).json({ message: '"email" must be a valid email' });
    }
    next();
};

const checkPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ message: '"password" is required' });
    }
    if (password.length < 6) {
        return res.status(400).json(
            {
                message: '"password" length must be 6 characters long', 
            },
        );
    }

    next();
};

const checkUser = async (req, res, next) => {
    const { email } = req.body;
    const existance = await userServices.checkUser(email);
    if (existance) {
        return res.status(409).json({ message: 'User already registered' });
    }

    next();
};

const addUser = async (req, res) => {
    const result = await userServices.addUser(req.body);
    const { id, displayName, email, image } = result;
    const token = jwt.sign(
        { id, displayName, email, image },
        process.env.JWT_SECRET,
        jwtConfig,
    );
    
    return res.status(201).json({ token });
};
  
const getAllUsers = async (req, res) => {
    const result = await userServices.getAllUsers();
    return res.status(200).json(result);
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const result = await userServices.getUserById(id);
    if (!result) return res.status(404).json({ message: 'User does not exist' });
    res.status(200).json(result);
};

const removeUser = async (req, res) => {
    try {
        const { userId } = req;
        await userServices.removeUser({ userId });

        return res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    checkDisplayName,
    checkEmail,
    checkPassword,
    checkUser,
    addUser,
    getAllUsers,
    getUserById,
    removeUser,
};