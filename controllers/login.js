const jwt = require('jsonwebtoken');

const { User } = require('../models');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });
    if (user.length === 0) return res.status(400).json({ message: 'Campos inválidos' });

    const token = jwt.sign(user.dataValues, process.env.SECRET);
    res.status(200).json({ token });
};

module.exports = { login };