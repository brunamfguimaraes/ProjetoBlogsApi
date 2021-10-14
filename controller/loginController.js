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
        console.log(users);
        if (users === 'Campos inválidos') {
            return res.status(40).json({ message: 'Campos inválidos' });
        }
        if (users === true) {
         const generateToken = jwt.sign({ data: users }, secret, jwtConfig);
         return res.status(200).json({ token: generateToken });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

module.exports = { login };