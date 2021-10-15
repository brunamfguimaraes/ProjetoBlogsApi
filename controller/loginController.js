const jwt = require('jsonwebtoken');
const loginService = require('../service/loginService');

const secret = 'seusecretdetoken';

const jwtConfig = {
    expiresIn: '10h',
    algorithm: 'HS256',
  };

const login = async (req, res) => {
    try {
        const user = req.body;
        const users = await loginService.login(user);
        console.log(users.dataValues);
        if (typeof (users) === 'string') {
            return res.status(400).json({ message: users });
        }
        if (users === 'Campos inválidos') {
            return res.status(400).json({ message: 'Campos inválidos' });
        }
        if (users.dataValues) {
         const generateToken = jwt.sign({ data: users }, secret, jwtConfig);
         return res.status(200).json({ token: generateToken });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

module.exports = { login };