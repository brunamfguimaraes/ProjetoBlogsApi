const jwt = require('jsonwebtoken');

const { User } = require('../models');

const create = async (req, res) => {
    await User.create(req.body);
    const data = req.body;
    const token = jwt.sign(data, process.env.JWT_SECRET);
    return res.status(201).json({ token });
};

const getAll = async (req, res) => {
    const user = await User.findAll();
    return res.status(200).json(user);
};

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
    return res
        .status(404).json({ message: 'User does not exist' }); 
}
    return res
        .status(200).send(user);
};

module.exports = { create, getAll, getUser };