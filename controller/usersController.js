const jwt = require('jsonwebtoken');
const usersService = require('../service/usersService');

const secret = 'seusecretdetoken';

const jwtConfig = {
    expiresIn: '10h',
    algorithm: 'HS256',
  };
const getAll = async (req, res) => {
    try {
        const users = await usersService.getAll();
        return res.status(201).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};
const createUser = async (req, res) => {
    try { 
        const result = await usersService.createUser(req.body);
        if (result === 'User already registered') {
            return res.status(409).json({ message: result });
        }
        if (typeof (result) === 'string') {
            return res.status(400).json({ message: result });
        }
        const generateToken = jwt.sign({ data: req.body }, secret, jwtConfig);
        return res.status(201).json({ token: generateToken });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

module.exports = { getAll, createUser };