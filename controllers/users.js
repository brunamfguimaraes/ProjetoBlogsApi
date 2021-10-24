const jwt = require('jsonwebtoken');

const { User } = require('../models');

const create = async (req, res) => {
    await User.create(req.body);
    const data = req.body;
    const token = jwt.sign(data, process.env.SECRET);
    res.status(201).json({ token });
};

module.exports = { create };