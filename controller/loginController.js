const loginService = require('../services/loginService');

const createLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const result = await loginService.getByEmail(email, password);
    if (result.token) return res.status(result.status).json({ token: result.token });
    res.status(result.status).json({ message: result.message });
};

module.exports = { 
  createLogin,
 };