const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv');

const createToken = (user) => {
    const { id, displayName, email, image } = user;

    const Token = jwt.sign({
        id, displayName, email, image,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: 1440, // 24h
    });

    return Token;
};

const createUser = async (req, res) => {
   const user = await User.create(req.body);

   const token = createToken(user);

    return res.status(201).json({ token });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const login = await User.findOne({ where: { email, password } });

    if (!login) {
        return res.status(400).json({ message: 'Invalid fields' });
    }

   const token = createToken(login);

   return res.status(200).json({ token });
};

module.exports = {
    createUser,
    loginUser,
};