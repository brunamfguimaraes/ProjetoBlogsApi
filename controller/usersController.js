const usersService = require('../service/usersService');

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
        const user = req.body;   
        const result = await usersService.createUser(user);
        return res.status(201).json({ user: result });
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

module.exports = { getAll, createUser };