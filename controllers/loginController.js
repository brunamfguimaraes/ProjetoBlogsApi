const express = require('express');
require('dotenv').config();

const router = express.Router();
const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const { JWT_SECRET } = process.env;

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const loginUser = await loginService.login(email, password);

    // console.log(loginUser)

    if (loginUser.message) {
      return res.status(400).json({ message: loginUser.message });
    }

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
  
    delete loginUser.password; 
  
    const token = jwt.sign({ data: loginUser }, JWT_SECRET, jwtConfig);
  
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
